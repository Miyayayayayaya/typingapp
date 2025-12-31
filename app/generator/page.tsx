'use client'
import { useState } from "react"
import { useRouter } from "next/navigation";
import TypingItem from '../types';
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
        # 出力ルール
        1. 日本語の文章(text)と、そのタイピング用アルファベット(typingTarget)を対にしてください。
        2. typingTarget は、必ず「すべて小文字」のアルファベットで出力してください。大文字は一切禁止です。
        3. ヘボン式ローマ字を基本にしてください。
        4. 出力は以下のJSON配列形式のみとし、説明文は含めないでください。
        [
        { "text": "こんにちは", "typingTarget": "konnichiha" },
        { "text": "ありがとう", "typingTarget": "arigatou" }
        ]
        # typingTarget の厳格なルール
        - スペース、カンマ、ピリオドなどの記号は一切含めないでください。
        - 「konnichiha」のように、連続したアルファベットのみで構成してください。
        - 英語の文章の場合も、単語間のスペースを詰めて「thisisapen」のように出力してください
        `;
        try{
            const result=await gemini.models.generateContent({
                model:'gemini-2.5-flash-lite',
                contents:prompt
            });
            const text=result.text
            const jsonMatch=text?.match(/\[[\s\S]*\]/);
            if(jsonMatch){
                const jsonString=jsonMatch[0];
                const rawData=JSON.parse(jsonString) as TypingItem[];
                const formattedData=rawData.map((item)=>({
                    ...item,
                    typingTarget:item.typingTarget.toLowerCase().replace(/[\s.,!?;:・]/g,"")
                }));
                localStorage.setItem("generatedTypingData",JSON.stringify(formattedData));
                console.log("保存直後の確認:", localStorage.getItem("generatedTypingData"));
                alert("問題を生成しました！ゲームを開始します。");
                window.location.href="/";
            }
        }catch(error){
            console.error("生成エラー：", error);
            alert("問題の生成中にエラーが発生しました。")
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