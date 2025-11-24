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
  let displayDivText:string="";
  let className:string="";
  for(let i=0;i<currentTargetText.length;i++){
    const char:string=currentTargetText[i];
    for (let i=0; i<currentTargetText.length; i++){
      if (i<inputCount){
        className="correct";
      }
      else if(i===inputCount){
        className=isMistake?"mistake":"current";
      }
      else{
        className="untyped";
      }
      displayDivText+='<div className={'+className+'}>'+char+'</div>';
    }
  }
  return displayDivText;
}
  useEffect(()=>{
    const handleKeyDown=(event:KeyboardEvent)=>{
      updateState(event.key,gameState,setGameState);
    };
    document.addEventListener('keydown',handleKeyDown);
    return ()=>{
      document.removeEventListener('keydown',handleKeyDown);
    }
  },[gameState])

  renderText(gameState.inputCount,gameState.isMistake,gameState.currentTargetText)
  const problem=typingGameData;
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {renderText(gameState.inputCount,gameState.isMistake,gameState.currentTargetText)}
      </div>
    </div>
  );
}
