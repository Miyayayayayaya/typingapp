'use client';
import { useEffect, useState } from 'react';
import {ResultsState} from '../types/state'
import { calculateResults } from './Calculate'
import styles from '../page.module.css';
import Link from 'next/link';
export default function ResultScreen(){
    const[result,setResult]=useState<ResultsState|null>(null);
    useEffect(()=>{
        const saved=localStorage.getItem("lastGameResult");
        if(saved){
            setResult(JSON.parse(saved));
        }
    },[]);
    if(!result||!result.gameState){
        return <p>結果を読み込みです...</p>;
    }
    const results=calculateResults(result.gameState,result.totalKeystrokes);
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
            <Link href="/">
                <button>メインメニューに戻る</button>
            </Link>
        </div>
        
    )
}