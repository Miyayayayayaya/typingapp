import { GameState } from "../types/state";
import {Results} from '../types/results'
export const calculateResults=(state:GameState,totalKeystrokes:number):Results|null=>{
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