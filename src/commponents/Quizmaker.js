import React, { useState } from 'react';
import axios from 'axios';

function Quizmaker(){

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    function handleSubmit(){ 
    console.log(question, answer);  
    }
    function generateQuesions(){
        axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple').then((response)=>
        console.log(response.data.results))
    }

    return(
        <div>
            <label>
                Enter a Question
                <input type="text" onChange={(e)=>{setQuestion(e.target.value)}} placeholder='Enter Question' />
            </label>
            <label> Enter the Answer 
                <input type="text" onChange={(e)=>{setAnswer(e.target.value)}} placeholder='Enter Answer' />
            </label>
                <button onClick={handleSubmit}> Submit </button>
                <label> Auto Generate Questions </label>
            
            <button onClick={generateQuesions}> Auto Generate </button>
        </div>
    )
}

export default Quizmaker;