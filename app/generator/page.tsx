'use client'
import { useState } from "react"
import {gemini} from '../lib/gemini'
import styles from '../page.module.css';
import Link from 'next/link';
import { Content } from "next/font/google";
export default function ProblemGenerator(){
    const [topic,setTopic]=useState("");
    const [generatedData,setGeneratedData]=useState("");
    const [loading,setLoading]=useState(false);
    const generateProblems=async()=>{
        if(!topic.trim()) return;
        setLoading(true);
        const prompt=`タイピングゲームの問題を5問作成してください。
        テーマ: ${topic}
        以下のJSON形式で出力してください。
        [
            { "text": "日本語の文章", "typingTarget": "alphabet input" }
        ]`;
        try{
            const result=await gemini.models.generateContent({
                model:'gemini-2.5-flash-lite',
                contents:prompt
            });
            const text=result.text
            if(text!=undefined){
                setGeneratedData(text);
            }
        }catch(error){
            console.error("生成エラー：", error);
        }finally{
            setLoading(false);
        }
    };
    return(
        <div className={styles.container}>
            <h1>問題ジェネレーター</h1>
            <div className={styles.board} style={{ height: 'auto', padding: '20px' }}>
                <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="例: プログラミング、日常会話"
                    style={{ padding: '10px', width: '80%', marginBottom: '10px' }}
                />
                <button onClick={generateProblems} disabled={loading} className={styles.button}>
                    {loading ? "AIが作成中..." : "問題を生成する"}
                </button>

                {generatedData && (
                    <pre style={{ background: '#eee', padding: '10px', marginTop: '10px', fontSize: '12px', overflowX: 'auto', width: '90%' }}>
                        {generatedData}
                    </pre>
                )}

                <hr style={{ width: '100%', margin: '20px 0' }} />
                <Link href="/">
                    <button>メインメニューに戻る</button>
                </Link>
            </div>
        </div>
    )
}