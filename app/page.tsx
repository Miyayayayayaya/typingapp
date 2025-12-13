"use client";
import styles from './page.module.css';
import typingGameData from './date';
import {useState,useEffect} from 'react';
import TypingItem from './types';
import {GameState} from './state';
import ResultScreen from './ResultScreen';
import { conversion } from './Conversion';
import Button from '@mui/material/Button';

type SetState<T>=React.Dispatch<React.SetStateAction<T>>;
const updateState=(keyPressed:string,currentState:GameState,setGameState:SetState<GameState>,typingData:TypingItem[])=>{
  if(!currentState.isGaming)return;
  const nextChar=currentState.currentTargetText[currentState.inputCount];
  let newInputCount=currentState.inputCount;
  if (keyPressed.length===1&&keyPressed!==nextChar){
    const newText=conversion(keyPressed,currentState,newInputCount)
    if(newText.currentConversion){
      setGameState(prev=>({
        ...prev,
        isMistake:false,
        inputCount:newText.newInputCount,
        isConversion:false,
        currentTargetText:newText.text
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
          gameTime:0,
          isResetting:true,
        }));
        setTimeout(()=>{
          setGameState(prev=>({
            ...prev,
            currentTargetText:nextProblem.typingTarget,
            displayTargetText:nextProblem.text,
            inputCount:0,
            isConversion:false,
            currentProblemIndex:nextIndex,
            
            isResetting:false,
            isMistake:false,
          }));
        },50);
        return;
      }else{
        setGameState(prev=>({
          ...prev,
          isGaming:false,
          endTime:Date.now(),
          isConversion:false,
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
    isConversion:false,
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
    isConversion:false,
    isGaming: false,
    startTime:null,
    endTime:null,
    mistakeCount:0,
    isGameFinished:false,
    isTimerActive:false,
    gameTime:0,
    isResetting:false,
  });
  const [timerId,setTimerId]=useState<number|null>(null);
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
      isTimerActive:true,
      gameTime:0,
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
  const GAME_OVER_TIME=10;
  useEffect(()=>{
    let intervalId:number|null=null;
    if (gameState.isGaming&&gameState.isTimerActive){
      intervalId=window.setInterval(()=>{
        setGameState(prev=>{
          const newGameTime=prev.gameTime+1;
          if(newGameTime>=GAME_OVER_TIME){
            return{
              ...prev,
              isGaming:false,
              isTimerActive:false,
              isGameFinished:true,
              endTime:Date.now(),
              displayTargetText:'時間切れ',
              gameTime:newGameTime,
            };
          }
          return{
            ...prev,
            gameTime:newGameTime
          };
        });
      },1000);
    }
    return()=>{
      if(intervalId!==null){
        window.clearInterval(intervalId);
      }
      if(timerId!==null){
        window.clearInterval(timerId);
        setTimerId(null)
      }
    };
  },[gameState.isGaming,gameState.isTimerActive,setGameState]);
  renderText(gameState.inputCount,gameState.isMistake,gameState.currentTargetText)
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {gameState.isGaming &&(<div className={styles.timerContainer}>
          <div className={`${styles.progressBar} ${gameState.isResetting ? styles.noTransition : ""}`} style={{width:`${(gameState.gameTime/GAME_OVER_TIME)*100}%`}}></div>
        </div>)}
        <p>{gameState.isGaming?(gameState.displayTargetText):("")}</p>
        <div className={styles.typingText}>
          {gameState.isGaming?(renderText(gameState.inputCount,gameState.isMistake,gameState.currentTargetText)):gameState.isGameFinished?(<ResultScreen gameState={gameState} totalKeystrokes={totalTargetKeysStrokes} startGame={startGame}/>):(
        <div className={styles.titleBoard}>タイピングゲーム</div>
      )}
        </div>
      {gameState.isGaming?(""):gameState.isGameFinished?(""):(<Button onClick={startGame} variant="contained">Start</Button>)}
      </div>
      <p>{gameState.gameTime}</p>
    </div>
  );
}