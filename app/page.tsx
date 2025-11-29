"use client";
import styles from './page.module.css';
import typingGameData from './date';
import {useState,useEffect} from 'react';
import TypingItem from './types';
import {GameState,ResultState} from './state';
import {Results} from './results'

type SetState<T>=React.Dispatch<React.SetStateAction<T>>;

const calculateResults=(state:GameState,totalKeystrokes:number):Results|null=>{
  if(!state.startTime||!state.endTime){
    return null;
  }
  const timeElapsedMs=state.endTime-state.startTime;
  const timeElapsedMinutes=timeElapsedMs/60000;
  const correctInputs=totalKeystrokes;
  const totalKeystrokesTyped=correctInputs+state.mistakeCount;
  const accuracy=((correctInputs/totalKeystrokesTyped)*100).toFixed(2);
  const wpm=Math.round((totalKeystrokesTyped/5)/timeElapsedMinutes);
  return{
    wpm:wpm,
    accuracy:accuracy,
    time: (timeElapsedMs/1000).toFixed(2),
    mistakes:state.mistakeCount,
  }

}

const updateState=(keyPressed:string,currentState:GameState,setGameState:SetState<GameState>,typingData:TypingItem[])=>{
  if(!currentState.isGaming)return;
  const nextChar=currentState.currentTargetText[currentState.inputCount];
  let newInputCount=currentState.inputCount;
  if (keyPressed.length===1&&keyPressed!==nextChar){
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
      <div className={styles.stateBoard}>
        <button onClick={startGame}>Start</button>
      </div>
      <div className={styles.board}>
        <p>{gameState.isGaming?(gameState.displayTargetText):("")}</p>
        {gameState.isGaming?(renderText(gameState.inputCount,gameState.isMistake,gameState.currentTargetText)):(
        <p>スタートボタンを押してください</p>
      )}
      </div>
    </div>
  );
}