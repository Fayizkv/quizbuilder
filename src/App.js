import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from './firebaseContext';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth"; // Import signOut from Firebase Auth
import { auth } from './firebase'; // Import auth from firebase.js
import './App.css';  // Import the CSS file

function App() {
  const {user} = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user exists and update the login status
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  async function handleLogout(){
    await signOut(auth);
    alert("Logout Success");
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <button onClick={() => navigate('/quizmaker')}>Make Quiz</button>
          <button onClick={() => navigate('/quizmakerauto')}>Automatic Quiz Generator</button>
          <button onClick={() => navigate('/quiz')}>Start Quiz</button>
          <button onClick={() => navigate('/scoreboard')}>Start Quiz</button>
          <button onClick={handleLogout}>Logout</button> {/* Logout button */}
        </div>
      ) : (
        <div>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Signup</button>
        </div>
      )}
    </div>
  );
}

export default App;
