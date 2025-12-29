'use client'
import { useState } from "react"
import { useRouter } from "next/navigation";
import {gemini} from '../lib/gemini'
import styles from '../page.module.css';
import Link from 'next/link';
export default function ProblemGenerator(){
    const [topic,setTopic]=useState("");
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    const generateProblems=async()=>{
        if(!topic.trim()) return;
        setLoading(true);
        const prompt=`タイピングゲームの問題を5問作成してください。
        テーマ: ${topic}
        出力は必ず以下のJSON形式の配列のみにしてください。余計な説明文は一切含めないでください。
        [
            { "text": "日本語の文章", "typingTarget": "alphabet" }
        ]`;
        try{
            const result=await gemini.models.generateContent({
                model:'gemini-2.5-flash-lite',
                contents:prompt
            });
            const text=result.text
            const jsonMatch=text?.match(/\[[\s\S]*\]/);
            if(jsonMatch){
                const jsonString=jsonMatch[0];
                localStorage.setItem("generatedTypingData",jsonString);
                console.log("保存直後の確認:", localStorage.getItem("generatedTypingData"));
                alert("問題を生成しました！ゲームを開始します。");
                //router.push("/");
                window.location.href="/";
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
                <hr style={{ width: '100%', margin: '20px 0' }} />
                <Link href="/">
                    <button>メインメニューに戻る</button>
                </Link>
            </div>
        </div>
    )
}