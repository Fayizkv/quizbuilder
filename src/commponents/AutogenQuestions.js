import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../firebaseContext'
import { addDoc, collection } from 'firebase/firestore';
// import { cordovaPopupRedirectResolver } from 'firebase/auth/cordova';


function AutogenQuestions() {


    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const Navigate = useNavigate();
    const { firestore } = useContext(FirebaseContext);

    function generateQuesions() {
        axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`).then((response) => {
            // console.log(response.data.results))
            const results = response.data.results;
            // console.log(results.difficulty, results.category);
            const collectionRef = collection(firestore, "questionBank")
            results.map((obj) => {
                addDoc(collectionRef, {
                    type: obj.type,
                    category: obj.category,
                    correctAnswer: obj.correct_answer,
                    difficulty: obj.difficulty,
                    question: obj.question,
                    incorrectAnswers: obj.incorrect_answers
                })
            })
            alert("Questions added to database succesfully");
        })
    }
    return (
        <div>
            <label> Auto Generate Questions </label>
            <div>
                <label>Difficulty: </label>
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="" disabled>Select Difficulty</option>
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
                    <option value="" disabled>Select Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals & Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime & Manga</option>
                    <option value="32">Entertainment: Cartoon & Animations</option>


                </select>
            </div>

            <button onClick={generateQuesions}> Auto Generate </button>
            <button onClick={() => { Navigate('/') }}> Go Back </button>
        </div>

    )
}

export default AutogenQuestions