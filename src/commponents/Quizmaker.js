import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../firebaseContext';
import { addDoc, collection } from 'firebase/firestore';
import './styles/Quizmaker.css'; // Import the CSS

function Quizmaker() {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [wrongAnswer1, setWrongAnswer1] = useState('');
    const [wrongAnswer2, setWrongAnswer2] = useState('');
    const [wrongAnswer3, setWrongAnswer3] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [category, setCategory] = useState('');

    const Navigate = useNavigate();
    const { firestore } = useContext(FirebaseContext);

    async function handleSubmit() {

        if (!question || !answer || !wrongAnswer1 || !wrongAnswer2 || !wrongAnswer3) {
            alert("Please fill in all fields before submitting.");
            return; // Prevent form submission
        }
        const collectionRef = collection(firestore, 'questionBank');
        const incorrectAnswers = [wrongAnswer1, wrongAnswer2, wrongAnswer3];

        await addDoc(collectionRef, {
            type: 'multiple',
            category: category,
            difficulty: difficulty,
            question: question,
            correctAnswer: answer,
            incorrectAnswers: incorrectAnswers
        });
        setQuestion('');
        setAnswer('');
        setWrongAnswer1('');
        setWrongAnswer2('');
        setWrongAnswer3('');
        alert("Question added to database successfully");
        Navigate('/quizmaker');
    }

    return (
        <div className="quizmaker-container">
            <label>Enter a Question</label>
            <input type="text" value={question} onChange={(e) => { setQuestion(e.target.value) }} placeholder='Enter Question' />
            
            <label>Enter the Answer</label>
            <input type="text" value={answer} onChange={(e) => { setAnswer(e.target.value) }} placeholder='Enter Answer' />
            
            <label>Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
            
            <label>Enter Wrong Options</label>
            <input type="text" value={wrongAnswer1} onChange={(e) => { setWrongAnswer1(e.target.value) }} />
            <input type="text" value={wrongAnswer2} onChange={(e) => { setWrongAnswer2(e.target.value) }} />
            <input type="text" value={wrongAnswer3} onChange={(e) => { setWrongAnswer3(e.target.value) }} />
            
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => { Navigate('/') }}>Go Back</button>
        </div>
    );
}

export default Quizmaker;
