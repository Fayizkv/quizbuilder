import React,{useState, useContext} from "react";
import { FirebaseContext } from "../firebaseContext";
import { collection, query, where, getDocs} from 'firebase/firestore';


function Quiz(){

    const {firestore} = useContext(FirebaseContext);
    const [quiz, setQuiz] = useState([]);
    const [category, setCategory] = useState('');
    const [selectedAnswer,setSelectedAnswer] = useState({});

    // const collectionRef = collection(firestore, 'questionBank');

    async function startQuiz(){
 
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


    function selectAnswer(questionid, userAnswer){
        setSelectedAnswer((prev) => ({
            ...prev,
            [questionid]: userAnswer,
        }));
    }

    function getResults(){
        let score = 0;
        quiz.forEach((question)=>{
            if ( selectedAnswer[question.id] === question.correctAnswer) score++;
        })
        console.log(score);
    }

    return( 
        <div>
            <h1> Let's Start</h1>
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
            <button onClick={()=>startQuiz()}>Start Quiz</button>
            { quiz.length > 0 ? 
                <div>
                    {quiz.map((question,index)=>(
                        <div key={question.id}>
                        <h1>{question.question}</h1>
                        <select 
                        value={selectedAnswer[question.id] || ''} onChange={(e)=>{selectAnswer(question.id, e.target.value)}}>
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