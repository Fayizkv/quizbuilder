import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quizmaker() {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const Navigate = useNavigate();

    function handleSubmit() {
        console.log(question, answer);
    }


    return (
        <div>
            <label>
                Enter a Question
                <input type="text" onChange={(e) => { setQuestion(e.target.value) }} placeholder='Enter Question' />
            </label>
            <label> Enter the Answer
                <input type="text" onChange={(e) => { setAnswer(e.target.value) }} placeholder='Enter Answer' />
            </label>
            <label> Enter options </label>
            <input type="text"></input>
            <input type="text"></input>
            <input type="text"></input>
            <button onClick={handleSubmit}> Submit </button>
            <button onClick={() => { Navigate('/') }}> Go Back </button>

        </div>
    )
}

export default Quizmaker;