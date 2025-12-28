import { GoogleGenAI } from "@google/genai";
const API_KEY=process.env.GEMINI_API_KEY;
if(!API_KEY){
    console.warn("APIキーが設定されていません")
}
export const gemini=new GoogleGenAI({apiKey: "AIzaSyDHp6fdzxFHhCOPB0S077-WfmLSQUVmxBk"});