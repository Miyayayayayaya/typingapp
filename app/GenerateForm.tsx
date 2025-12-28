import React,{useState,FormEvent} from 'react';
import { generateQuizProblem } from './quizGenerator';

export const GenreForm:React.FC=()=>{
    const [genre, setGenre]=useState('');
    const [problem, setProblem]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const handleSubmit=async(e:FormEvent)=>{
        e.preventDefault();
        if(!genre.trim()){
            setProblem('ジャンルを入力してください。');
            return;
        }
        setIsLoading(true);
        setProblem('問題を生成中です...');
        try{
            const generateProblem:string=await generateQuizProblem(genre);
            setProblem(generateProblem);
        }catch(error){
            console.error('フォーム処理エラー:',error);
            setProblem('問題の生成中に致命的なエラーが発生しました。コンソールを確認してください。');
        }finally{
            setIsLoading(false);
        }
    };
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                value={genre}
                onChange={(e)=>setGenre(e.target.value)}
                disabled={isLoading}
                style={{padding: '8px', marginRight: '10px', width: '300px'}}
                />
                <button 
                type="submit"
                disabled={isLoading}
                style={{padding: '8px 15px'}}>
                    {isLoading?'生成中...':'問題を出題'}
                </button>
            </form>
            {problem&&(
                <div style={{border: '1px solid #ccc', padding: '15px', marginTop: '20px', whiteSpace: 'pre-wrap'}}>
                    <h3>出題されたテキスト</h3>
                    <p>{problem}</p>
                </div>
            )}
        </div>
    )
}
