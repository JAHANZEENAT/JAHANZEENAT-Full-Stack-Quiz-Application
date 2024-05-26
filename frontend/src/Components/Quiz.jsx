import React, { useRef, useState } from 'react'
import {data} from './../assets/data'
import './Quiz.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Quiz() {
    let [index,setIndex] = useState(0)
    let [question,setQuestion]=useState(data[index])
    let [lock,setLock]=useState(false) 
    let [score,setScore]=useState(0)
    let [result,setResult]=useState(false)
    const navigate=useNavigate()
    const Option1 = useRef(null)
    const Option2 = useRef(null)
    const Option3 = useRef(null)
    const Option4 = useRef(null)

    let option_array=[Option1,Option2,Option3,Option4]

    const checkAns = (e,ans)=>{
        if(lock===false){
            if(question.ans===ans){
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev=>prev+1)
            }
            else{
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans-1].current.classList.add("correct");
                }
        }
            
    }
    const next=()=>{
        if(lock===true){
            if(index===data.length-1){
                setResult(true);
                const userst = localStorage.getItem("user")
                const user = JSON.parse(userst);
                axios.post('http://localhost:8002/setscore', {userscore : score, email:user.email})
                return 0;
            }
            setIndex(++index)
            setQuestion(data[index])
            setLock(false);
            option_array.map((option)=>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null; 
            })
        }     
    }

  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr/>
        {result?<><button type="submit" onClick={()=>{window.location.reload()}}>Play Again</button>
        <button type="submit" onClick={()=>{navigate('/score')}}>Check Score</button>

                <button type="submit" onClick={()=>{navigate('/')}}>Exit</button></>:<>
        <h2>{index+1}.{question.question}</h2>
            <ul>
                <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
                <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
                <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
                <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
            </ul>
        <button onClick={next}>Next</button>
        <div className='index'>{index+1} of {data.length} questions</div>
        </>}
        
      
    </div>
  )
}
