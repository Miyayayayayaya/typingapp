import styles from './page.module.css';
import typingGameData from './date';


export default function Home() {
  let currentTargetText:string="taipingu";
  let inputCount:number=0;
  let isMistake:boolean=false;

  const textDisplayElement=document.getElementById("typing-text");
  const renderText=(inputCount:number)=>{
    let outputHTML:string="";
    for (let i=0; i<currentTargetText.length; i++){
      let className:string="";
      if (i<inputCount){
        className="correct";
      }
      else if(i===inputCount){
        className=isMistake?"mistake":"current";
      }
      else{
        className="untyped";
      }
    }
  }
  const problem=typingGameData;
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <div className={className}>${char}</div>
      </div>
    </div>
  );
}
