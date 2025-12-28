import { OpenAI } from "openai/client.js";
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey=process.env.OPENAI_API_KEY;
if (!apiKey){
    throw new Error('OPENAI_API_KEYが環境変数に設定されていません。');
}
const openai=new OpenAI({apiKey});
export async function generateQuizProblem(genre:string):Promise<string>{
    console.log(`Sending prompt: "${genre}"`);
    try{
        const completion=await openai.chat.completions.create({
            model:'gpt-4.1',
            messages:[
                {
                    role:'system',
                    content:'あなたはタイピングゲームのテキストを出題するためのシステムです。与えられたジャンルに関係する名言や人物、場所などをリストで10個回答してください'
                },
                {
                    role: 'user',
                    content:`以下のジャンルに基づいてリストを生成してください: 「${genre}」`
                },
            ],
            temperature:0.8,
            max_tokens:150,
        });
        const problemText=completion.choices[0].message.content;
        if(!problemText){
            return '問題の生成に失敗しました。';
        }
        return problemText.trim()
    }catch(error){
        console.error('API呼び出し中にエラーが発生しました:',error);
        return `問題生成中にエラーが発生しました: ${(error as Error).message}`
    }
}