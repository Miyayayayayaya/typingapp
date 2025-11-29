import {ResultsState} from './state'
import { calculateResults } from './Calculate'
import styles from './page.module.css';
export default function ResultScreen({gameState,totalKeystrokes,startGame}:ResultsState){
    const results=calculateResults(gameState,totalKeystrokes);
    if (!results){
        return <p>結果を処理中です...</p>
    }
    return(
        <div className={styles.resultContainer}>
            <h2>Result</h2>
            <p><strong>WPM(分間単語数):</strong>{results.wpm}</p>
            <p><strong>正確性:</strong>{results.accuracy}%</p>
            <p><strong>経過時間:</strong>{results.time} 秒</p>
            <p><strong>ミスタイプ数:</strong>{results.mistakes} 回</p>
            <button className={styles.startButton} onClick={startGame}>もう一度挑戦をする</button>
        </div>
    )
}