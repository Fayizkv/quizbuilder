import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {FirebaseContext} from '../firebaseContext'
import { addDoc, collection } from 'firebase/firestore';
// import { cordovaPopupRedirectResolver } from 'firebase/auth/cordova';


function AutogenQuestions() {


    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const Navigate = useNavigate();
    const {firestore} = useContext(FirebaseContext);

    function generateQuesions() {
        axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`).then((response) =>
        {
                // console.log(response.data.results))
        const results = response.data.results;
        // console.log(results.difficulty, results.category);
        const collectionRef = collection(firestore,"questionBank")
        results.map((obj)=>{
            console.log(obj.difficulty, obj.category,);
            addDoc(collectionRef,{
                type: obj.type,
                category: obj.category,
                correctAnswer: obj.correct_answer,
                difficulty: obj.difficulty,
                question: obj.question,
                incorrectAnswers: obj.incorrect_answers
            })
        })
        console.log("inserted succesfully");
        })
    }
    return (
        <div>
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
                    
                </select>
            </div>

            <button onClick={generateQuesions}> Auto Generate </button>
            <button onClick={() => { Navigate('/') }}> Go Back </button>
        </div>

    )
}

export default AutogenQuestions