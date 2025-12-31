import {GameState} from './types/state';


export const conversion=(keyPressed:string,currentState:GameState,newInputCount:number,)=>{
    const vowel=["a","i","u","e","o"]
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
    if(keyPressed==='h'&&currentState.currentTargetText[currentState.inputCount]==='f'){
        newInputCount++;
        for(let i=0;i<vowel.length;i++){
            if(currentState.currentTargetText[currentState.inputCount+1]===vowel[i]){
                if(vowel[i]==="u"){
                    const newText=currentState.currentTargetText.replace('f'+vowel[i],()=>{
                    return 'h'+vowel[i]
                })
                conversionText=newText
                }else{
                    const newText=currentState.currentTargetText.replace('f'+vowel[i],()=>{
                    return 'hux'+vowel[i]
                })
                conversionText=newText
                }
                checkConversion=true
            }
        }
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