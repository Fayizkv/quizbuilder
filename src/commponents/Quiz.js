import React, { useState, useContext } from "react";
import { FirebaseContext } from "../firebaseContext";
import { collection, query, where, getDocs } from 'firebase/firestore';
import Scoreboard from "./Scoreboard";


function Quiz() {

    const { firestore } = useContext(FirebaseContext);
    const [quiz, setQuiz] = useState([]);
    const [category, setCategory] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const [score, setScore] = useState(0);

    // const collectionRef = collection(firestore, 'questionBank');

    async function startQuiz() {

        const collectionRef = collection(firestore, 'questionBank');
        const categoryQuery = query(collectionRef, where('category', '==', category));

        const questions = await getDocs(categoryQuery);

        const allQuestions = [];
        questions.forEach((doc) => {
            // console.log(doc.data());
            allQuestions.push({ id: doc.id, ...doc.data() });
        });

        const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
        const randomQuestions = shuffledQuestions.slice(0, 10);


        setQuiz(randomQuestions);

    }


    function selectAnswer(questionid, userAnswer) {
        setSelectedAnswer((prev) => ({
            ...prev,
            [questionid]: userAnswer,
        }));
    }

    function getResults() {
        let score = 0;
        quiz.forEach((question) => {
            if (selectedAnswer[question.id] === question.correctAnswer) score++;
        })
        console.log(score);
        setScore(score);
        // <Scoreboard score:{score} />
    }

    return (
        <div>
            <h1> Let's Start</h1>
            <div>
                <label>Category: </label>
                <select
                    value={category ? category : setCategory('General Knowledge')}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="General Knowledge">General Knowledge</option>
                    <option value="Entertainment: Books">Entertainment: Books</option>
                    <option value="Entertainment: Film">Entertainment: Film</option>
                    <option value="Entertainment: Music">Entertainment: Music</option>
                    <option value="Entertainment: Musicals & Theatres">Entertainment: Musicals & Theatres</option>
                    <option value="Entertainment: Television">Entertainment: Television</option>
                    <option value="Entertainment: Video Games">Entertainment: Video Games</option>
                    <option value="Entertainment: Board Games">Entertainment: Board Games</option>
                    <option value="Science & Nature">Science & Nature</option>
                    <option value="Science: Computers">Science: Computers</option>
                    <option value="Science: Mathematics">Science: Mathematics</option>
                    <option value="Mythology">Mythology</option>
                    <option value="Sports">Sports</option>
                    <option value="Geography">Geography</option>
                    <option value="History">History</option>
                    <option value="Politics">Politics</option>
                    <option value="Art">Art</option>
                    <option value="Celebrities">Celebrities</option>
                    <option value="Animals">Animals</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Entertainment: Comics">Entertainment: Comics</option>
                    <option value="Science: Gadgets">Science: Gadgets</option>
                    <option value="Entertainment: Japanese Anime & Manga">Entertainment: Japanese Anime & Manga</option>
                    <option value="Entertainment: Cartoon & Animations">Entertainment: Cartoon & Animations</option>


                </select>
            </div>
            <button onClick={() => startQuiz()}>Start Quiz</button>
            {quiz.length > 0 ?
                <div>
                    {quiz.map((question, index) => (
                        <div key={question.id}>
                            <h1>{question.question}</h1>
                            <select
                                value={selectedAnswer[question.id] || ''} onChange={(e) => { selectAnswer(question.id, e.target.value) }}>
                                <option value="">Select an option</option>
                                {([question.correctAnswer, ...question.incorrectAnswers]).sort(() => Math.random() - 0.5).map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <button onClick={getResults}>Submit</button>

                </div>
                : <h1>No questions available, please click start</h1>
            }
        </div>
    )
}

export default Quiz