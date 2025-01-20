import React,{useState, useContext} from "react";
import { FirebaseContext } from "../firebaseContext";
import {allDoc, collection, query, where, limit, getDocs} from 'firebase/firestore';


function Quiz(){

    const {firestore} = useContext(FirebaseContext);

    async function startQuiz(cat){
        console.log(cat);
        const collectionRef = collection(firestore, 'questionBank');
        const categoryQuery = query(collectionRef, where('category', '==', cat)); 

        const questions = await getDocs(categoryQuery);

        const allQuestions = [];
        questions.forEach((doc) => {
            console.log(doc.data());
            allQuestions.push({ id: doc.id, ...doc.data() });
        });

        const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
        const randomQuestions = shuffledQuestions.slice(0, 10);


        // console.log(randomQuestions);

    }

    return( 
        <div>
            <h1> Let's Start</h1>
            <button onClick={()=>startQuiz('General Knowledge')}>Start Quiz</button>

            <button>Submit</button>
        </div>
    )
}

export default Quiz