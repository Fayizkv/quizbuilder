import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../firebaseContext';
import { addDoc, collection } from 'firebase/firestore';

function Quizmaker() {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [wrongAnswer1, setWrongAnswer1] = useState('');
    const [wrongAnswer2, setWrongAnswer2] = useState('');
    const [wrongAnswer3, setWrongAnswer3] = useState('');
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [difficulty, setDifficulty] = useState('');
    const [category, setCategory] = useState('');

    const Navigate = useNavigate();
    const {firestore} = useContext(FirebaseContext);

    async function handleSubmit() {
            const collectionRef = collection(firestore,'questionBank');
            setWrongAnswers([wrongAnswer1,wrongAnswer2,wrongAnswer3]);
            const ref = await addDoc(collectionRef,{
                type:'multiple',
                category:category,
                difficulty:difficulty,
                question:question,
                correctAnswer:answer,
                wrongAnswers:wrongAnswers
            });
            setQuestion('');
            setAnswer('');
            setWrongAnswers(['']);
            setWrongAnswer1('');
            setWrongAnswer2('');
            setWrongAnswer3('');
            alert("Question added to database succesfully");
            Navigate('/quizmaker');
    }


    return (
        <div>
            <label>
                Enter a Question
                <input type="text" value={question} onChange={(e) => { setQuestion(e.target.value) }} placeholder='Enter Question' />
            </label>
            <label> Enter the Answer
                <input type="text" value={answer} onChange={(e) => { setAnswer(e.target.value) }} placeholder='Enter Answer' />
            </label>
            <div>
                <label>Difficulty: </label>
                <select
                    value={difficulty ? difficulty : setDifficulty('easy')}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="easy" >Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div>
                <label>Category: </label>
                <select
                    value={category ? category : setCategory('General Knowledge')}
                    onChange={(e) => setCategory(e.target.value)}
                >
                   <option value="General Knowledge">General Knowledge</option>
                    <option value="Sports">Sports</option>
                    <option value="Science: Computers">Science: Computers</option>

                </select>
            </div>

            <label> Enter wrong options </label>
            <input type="text" value={wrongAnswer1} onChange={(e)=>{setWrongAnswer1(e.target.value)}}></input>
            <input type="text" value={wrongAnswer2} onChange={(e)=>{setWrongAnswer2(e.target.value)}}></input>
            <input type="text" value={wrongAnswer3} onChange={(e)=>{setWrongAnswer3(e.target.value)}}></input>
            <button onClick={handleSubmit}> Submit </button>
            <button onClick={() => { Navigate('/') }}> Go Back </button>

        </div>
    )
}

export default Quizmaker;