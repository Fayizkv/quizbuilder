import React, { useState, useContext } from "react";
import { FirebaseContext } from "../firebaseContext";
import { collection, query, where, getDocs, getDoc, updateDoc, doc, arrayUnion, setDoc } from 'firebase/firestore';
import Scoreboard from "./Scoreboard";
import './styles/Quiz.css'; // Assuming the CSS is in the same folder
import { useNavigate } from "react-router-dom";

function Quiz() {
    const { firestore, user } = useContext(FirebaseContext);
    const [quiz, setQuiz] = useState([]);
    const [category, setCategory] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const navigate = useNavigate()

    async function startQuiz() {
        const collectionRef = collection(firestore, 'questionBank');
        const categoryQuery = query(collectionRef, where('category', '==', category));
        const questions = await getDocs(categoryQuery);

        const allQuestions = [];
        questions.forEach((doc) => {
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

    function saveResults(score) {
        const usersCollectionRef = collection(firestore, "users");
        
        // Query the collection where the 'uid' field matches the user's uid
        const q = query(usersCollectionRef, where("uid", "==", user.uid));
        
        // Get documents based on the query
        getDocs(q)
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const userDocRef = querySnapshot.docs[0].ref; // Get the document reference of the first matched document
                    
                    // Update the scores array
                    updateDoc(userDocRef, {
                        scores: arrayUnion({
                            score: score,
                            date: new Date().toISOString(),
                        })
                    })
                    .then(() => {
                        console.log("Score updated successfully!");
                    })
                    .catch((error) => {
                        console.error("Error updating score: ", error);
                    });
                } else {
                    console.error("No document found with the specified uid.");
                }
            })
            .catch((error) => {
                console.error("Error retrieving document: ", error);
            });
    }
    function getResults() {
        let score = 0;
        quiz.forEach((question) => {
            if (selectedAnswer[question.id] === question.correctAnswer) score++;
        });
        alert(`Your Score : ${score}`);
        if (user)
            saveResults(score);
        navigate('/scoreboard');
    }

    return (
        <div className="quiz-container">
            <h1 className="quiz-header">Let's Start</h1>
            <div className="category-select">
                <label>Category: </label>
                <select
                    value={category}
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
            <button className="start-button" onClick={() => startQuiz()}>Start Quiz</button>
            {quiz.length > 0 ?
                <div className="quiz-questions">
                    {quiz.map((question, index) => (
                        <div key={question.id} className="question-item">
                            <h2 className="question-text">{question.question}</h2>
                            <select
                                value={selectedAnswer[question.id] || ''}
                                onChange={(e) => selectAnswer(question.id, e.target.value)}
                                className="answer-select"
                            >
                                <option value="">Select an option</option>
                                {([question.correctAnswer, ...question.incorrectAnswers]).sort(() => Math.random() - 0.5).map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                    <button className="submit-button" onClick={getResults}>Submit</button>
                </div>
                : <h1 className="no-questions">No questions available, please click start</h1>
            }
        </div>
    );
}

export default Quiz;
