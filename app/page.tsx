"use client";
import styles from './page.module.css';
import typingGameData from './date';
import {useState,useEffect} from 'react';
import GameState from './state';

type SetState<T>=React.Dispatch<React.SetStateAction<T>>;

const updateState=(keyPressed:string,currentState:GameState,setGameState:SetState<GameState>)=>{
  if(!currentState.isGaming)return;
  const nextChar=currentState.currentTargetText[currentState.inputCount];
  let newInputCount=currentState.inputCount;
  let newIsMistake=currentState.isMistake;
  if(keyPressed.length===1){
    if(keyPressed===nextChar){
      newInputCount++;
      newIsMistake=false;
    }else{
      newIsMistake=true;
    }
  }
  setGameState({
    ...currentState,
    inputCount:newInputCount,
    isMistake:newIsMistake,
  })
}

export default function Home() {
  const [gameState,setGameState]=useState({
    currentTargetText:"りんご",
    inputCount:0,
    isMistake: false,
    isGaming: false,
  })
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
    setGameState(prev=>({
      ...prev,
      isGaming:true,
      currentTargetText:"ringo",
      inputCount:0,
      isMistake:false,
    }))
  }
  useEffect(()=>{
    const handleKeyDown=(event:KeyboardEvent)=>{
      updateState(event.key,gameState,setGameState);
    };
    document.addEventListener('keydown',handleKeyDown);
    return ()=>{
      document.removeEventListener('keydown',handleKeyDown);
    }
  },[gameState,setGameState])
  console.log(gameState)
  renderText(gameState.inputCount,gameState.isMistake,gameState.currentTargetText)
  const problem=typingGameData;
  return (
    <div className={styles.container}>
      <div className={styles.stateBoard}>
        <button onClick={startGame}>Start</button>
      </div>
      <div className={styles.board}>{gameState.isGaming?(renderText(gameState.inputCount,gameState.isMistake,gameState.currentTargetText)):(
        <p>スタートボタンを押してください</p>
      )}
      </div>
    </div>
  );
}
