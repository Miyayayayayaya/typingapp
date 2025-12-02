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
    }
    if(keyPressed==='h'&&currentState.currentTargetText[currentState.inputCount]==='f'&&currentState.currentTargetText[currentState.inputCount+1]==='u'){
        newInputCount++;
        const newText=currentState.currentTargetText.replace('fu',()=>{
            return 'hu'
        })
        conversionText=newText
        checkConversion=true
    }
    if(keyPressed==='h'&&currentState.currentTargetText[currentState.inputCount]==='f'&&currentState.currentTargetText[currentState.inputCount+1]==='i'){
        newInputCount++;
        const newText=currentState.currentTargetText.replace('fi',()=>{
            return 'huxi'
        })
        conversionText=newText
        checkConversion=true
    }
    if(keyPressed==='l'&&currentState.currentTargetText[currentState.inputCount]==='r'&&currentState.currentTargetText[currentState.inputCount+1]==='u'){
        newInputCount++;
        const newText=currentState.currentTargetText.replace('ru',()=>{
            return 'lu'
        })
        conversionText=newText
        checkConversion=true
    }
    if(keyPressed==='z'&&currentState.currentTargetText[currentState.inputCount]==='j'&&currentState.currentTargetText[currentState.inputCount+1]==='i'){
        newInputCount++;
        const newText=currentState.currentTargetText.replace('ji',()=>{
            return 'zi'
        })
        conversionText=newText
        checkConversion=true
    }
    if(keyPressed==='t'&&currentState.currentTargetText[currentState.inputCount]==='c'&&currentState.currentTargetText[currentState.inputCount+1]==='h'){
        newInputCount++;
        const newText=currentState.currentTargetText.replace('ch',()=>{
            return 'ty'
        })
        conversionText=newText
        checkConversion=true
    }
    if(!checkConversion){
        conversionText=currentState.currentTargetText
    }
    return{
        newInputCount:newInputCount,
        text:conversionText,
        currentConversion:checkConversion,
    }
}