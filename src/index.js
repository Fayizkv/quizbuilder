import React,{ createContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseProvider } from './firebaseContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './commponents/Login';
import Quizmaker from './commponents/Quizmaker';
import AutogenQuestions from './commponents/AutogenQuestions'
import Signup from './commponents/Signup';
import Quiz from './commponents/Quiz';
import ProtectedRoute from './ProtectedRoute';
import Scoreboard from './commponents/Scoreboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <FirebaseProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login />}/>

        <Route path="/quizmaker" element={ <ProtectedRoute> <Quizmaker /></ProtectedRoute>}/>
        <Route path="/quizmakerauto" element={<ProtectedRoute> <AutogenQuestions/></ProtectedRoute>}/>
        <Route path="/quiz" element={ <ProtectedRoute><Quiz/> </ProtectedRoute>}></Route>
        <Route path="/scoreboard" element={ <ProtectedRoute><Scoreboard /></ProtectedRoute>}/>

      </Routes>
    </Router>
    </FirebaseProvider>
  </React.StrictMode>
);

