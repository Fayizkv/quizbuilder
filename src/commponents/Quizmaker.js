import React, { useDebugValue, useState } from 'react';
import axios from 'axios';

function Quizmaker(){

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');

    function handleSubmit(){ 
    console.log(question, answer);  
    }
    function generateQuesions(){
        axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`).then((response)=>
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
                <div>
        <label>Difficulty: </label>
        <select
          value={difficulty ? difficulty : "easy"}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      
      <div>
        <label>Category: </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="18">Science: Computers</option>
          {/* Add more categories as needed */}
        </select>
      </div>
            
            <button onClick={generateQuesions}> Auto Generate </button>
        </div>
    )
}

export default Quizmaker;