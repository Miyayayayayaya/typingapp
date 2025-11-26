interface GameState{
    displayTargetText:string;
    currentProblemIndex:number;
    currentTargetText: string;
    inputCount: number;
    isMistake: boolean;
    isGaming: boolean;
}

export default GameState