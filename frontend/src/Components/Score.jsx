import './Quiz.css'
import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
export default function Score(){
    axios.get('http://localhost:8002/getscore')
         .then(response => {
           // Assuming the score is in the response data
           const score = JSON.stringify(response.data);
           console.log(score)
           document.getElementById('score').innerText = score;
         })
         .catch(error => {
           console.error('Error fetching score:', error);
           document.getElementById('score').innerText = 'Error fetching score';
         });
          const navigate=useNavigate()
        
    return (
        <div className='container'>
            
            <h2 style={{display : 'flex'}}>Your Score is  :  <div id="score"
            style={{marginLeft : '15px'}}>
                </div>  </h2>
                <button type="submit" onClick={()=>{navigate('/quiz')}}>Play Again</button>
                <button type="submit" onClick={()=>{navigate('/')}}>Exit</button>
        </div>
    )
}