import {GameState} from './state';


export const conversion=(keyPressed:string,currentState:GameState,newInputCount:number,)=>{
    let checkConversion=false
    let conversionText=""
    if(keyPressed==='x'&&currentState.currentTargetText[currentState.inputCount]==='t'&&currentState.currentTargetText[currentState.inputCount+1]==='t'){
        newInputCount++;
        const newText=currentState.currentTargetText.replace('tt',()=>{
            return 'xtut'
        })
        conversionText=newText
        checkConversion=true
    }else{
        conversionText=currentState.currentTargetText
    }
    return{
        newInputCount:newInputCount,
        text:conversionText,
        currentConversion:checkConversion,
    }
}