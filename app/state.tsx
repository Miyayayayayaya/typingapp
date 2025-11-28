interface GameState{
    displayTargetText:string;
    currentProblemIndex:number;
    currentTargetText: string;
    inputCount: number;
    isMistake: boolean;
    isGaming: boolean;
    startTime:number|null;
    endTime:number|null;
    mistakeCount:number;
    isGameFinished:boolean;
}

export default GameState