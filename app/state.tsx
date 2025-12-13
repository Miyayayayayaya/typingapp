export interface GameState{
    displayTargetText:string;
    currentProblemIndex:number;
    currentTargetText: string;
    inputCount: number;
    isMistake: boolean;
    isConversion:boolean;
    isGaming: boolean;
    startTime:number|null;
    endTime:number|null;
    mistakeCount:number;
    isGameFinished:boolean;
    isTimerActive:boolean;
    gameTime:number;
    isResetting:boolean;
}

export interface ResultsState{
    gameState:GameState;
    totalKeystrokes:number;
    startGame:()=>void;
}



