import { useNavigate } from "react-router-dom";
import {FirebaseContext} from '../firebaseContext';
import {collection, getDocs, query, where} from 'firebase/firestore';
import React,{useContext, useState, useEffect} from "react";


function Scoreboard({}){

    const {firestore, user} = useContext(FirebaseContext);
    const [score,setScore] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getScores = async () => {
          if (user) {
            const collectionRef = collection(firestore, 'users');
            const q = query(collectionRef, where("uid", "==", user.uid));
    
            try {
              const querySnapshot = await getDocs(q);
    
              if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const data = doc.data();
    
                if (data.scores) {
                  console.log("Scores: ", data.scores);
                  setScore(data.scores); // Set the scores from Firestore
                }
              }
            } catch (error) {
              console.error("Error fetching scores: ", error);
            }
          }
        };
    
        getScores(); // Call the async function inside useEffect
      }, [user, firestore]);
    return(
        <div>
            <h1> Score Board </h1>
            <table>
            <thead>
          <tr>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {score.length > 0 ? (
            score.map((scoreObj, index) => (
              <tr key={index}>
                <td>{scoreObj.score}</td>
                <td>{new Date(scoreObj.date).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No scores available.</td>
            </tr>
          )}
        </tbody>
            </table>
            <button onClick={()=>{navigate("/")}}> Home </button>
        </div>
    )
}

export default Scoreboard;