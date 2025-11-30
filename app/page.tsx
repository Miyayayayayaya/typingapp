"use client";
import styles from './page.module.css';
import typingGameData from './date';
import {useState,useEffect} from 'react';
import TypingItem from './types';
import {GameState} from './state';
import ResultScreen from './ResultScreen';

type SetState<T>=React.Dispatch<React.SetStateAction<T>>;
const updateState=(keyPressed:string,currentState:GameState,setGameState:SetState<GameState>,typingData:TypingItem[])=>{
  if(!currentState.isGaming)return;
  const nextChar=currentState.currentTargetText[currentState.inputCount];
  let newInputCount=currentState.inputCount;
  if (keyPressed.length===1&&keyPressed!==nextChar){
    if(keyPressed==='x'&&currentState.currentTargetText[currentState.inputCount]==='t'&&currentState.currentTargetText[currentState.inputCount+1]==='t'){
      newInputCount++;
      const newText=currentState.currentTargetText.replace('tt',()=>{
        return 'xtut'
      })
      setGameState(prev=>({
        ...prev,
        isMistake:false,
        inputCount:newInputCount,
        currentTargetText:newText
      }));
      return;
    }
    setGameState(prev=>({
      ...prev,
      isMistake:true,
      mistakeCount:prev.mistakeCount+1,
    }));
    return;
  }
  if(keyPressed.length===1&&keyPressed===nextChar){
    newInputCount++;
    if(newInputCount===currentState.currentTargetText.length){
      const nextIndex=currentState.currentProblemIndex+1;
      if(nextIndex<typingData.length){
        const nextProblem=typingData[nextIndex];
        setGameState(prev=>({
          ...prev,
          currentTargetText:nextProblem.typingTarget,
          displayTargetText:nextProblem.text,
          inputCount:0,
          isMistake:false,
          currentProblemIndex:nextIndex,
        }));
        return;
      }else{
        setGameState(prev=>({
          ...prev,
          isGaming:false,
          endTime:Date.now(),
          isGameFinished:true,
          displayTargetText:"GameClear",
        }));
        return;
      }
    }
  };
  setGameState(prev=>({
    ...prev,
    inputCount:newInputCount,
    isMistake:false,
  }));
};

const initialProblem=typingGameData[0];

export default function Home() {
  const [gameState,setGameState]=useState<GameState>({
    currentProblemIndex:0,
    currentTargetText:initialProblem.typingTarget,
    displayTargetText:initialProblem.text,
    inputCount:0,
    isMistake: false,
    isGaming: false,
    startTime:null,
    endTime:null,
    mistakeCount:0,
    isGameFinished:false,
  });
  const totalTargetKeysStrokes=typingGameData.reduce((sum,item)=>sum+item.typingTarget.length,0);
  const renderText=(inputCount:number,isMistake:boolean,currentTargetText:string)=>{
    return currentTargetText.split('').map((char,i)=>{
      let className:string="";
      if (i<inputCount){
        className=styles.correct;
      }
      else if(i===inputCount){
        className=isMistake?styles.mistake:styles.current;
      }
      else{
        className=styles.untyped;
      }
      return <span key={i} className={className}>{char}</span>;
    })
  }
  const startGame=()=>{
    const firstProblem=typingGameData[0]?.text||"エラー";
    if(firstProblem==="エラー"){
      console.error("出題リストが空です.");
      return;
    }
    setGameState(prev=>({
      ...prev,
      currentTargetText:initialProblem.typingTarget,
      displayTargetText:initialProblem.text,
      isGaming:true,
      inputCount:0,
      isMistake:false,
      currentProblemIndex:0,
      startTime:Date.now(),
      endTime:null,
      mistakeCount:0,
      isGameFinished:false,
    }));
  }
  useEffect(()=>{
    const handleKeyDown=(event:KeyboardEvent)=>{
      updateState(event.key,gameState,setGameState,typingGameData);
    };
    document.addEventListener('keydown',handleKeyDown);
    return ()=>{
      document.removeEventListener('keydown',handleKeyDown);
    }
  },[gameState,setGameState])
  console.log(gameState)
  renderText(gameState.inputCount,gameState.isMistake,gameState.currentTargetText)
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {/* <div className={styles.textbox}/> */}
        <p>{gameState.isGaming?(gameState.displayTargetText):("")}</p>
        <div className={styles.typingText}>
          {gameState.isGaming?(renderText(gameState.inputCount,gameState.isMistake,gameState.currentTargetText)):gameState.isGameFinished?(<ResultScreen gameState={gameState} totalKeystrokes={totalTargetKeysStrokes} startGame={startGame}/>):(
        <p>スタートボタンを押してください</p>
      )}
        </div>
      {gameState.isGaming?(""):gameState.isGameFinished?(""):(<button onClick={startGame}>Start</button>)}
      </div>
    </div>
  );
}