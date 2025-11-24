import styles from './page.module.css';
import typingGameData from './date';
const renderText=(inputCount:number,isMistake:boolean,currentTargetText:string,className:string)=>{
  let displayDivText:string="";
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

export default function Home() {
  let className:string=""
  const currentTargetText:string="taipingu";
  const inputCount:number=0;
  const isMistake:boolean=false;
  const textDisplayElement=document.getElementById("typing-text");
  renderText(inputCount,isMistake,currentTargetText,className)
  const problem=typingGameData;
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {renderText(inputCount,isMistake,currentTargetText,className)}
      </div>
    </div>
  );
}
