import React,{ createContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseProvider } from './firebaseContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './commponents/Login';
import Quizmaker from './commponents/Quizmaker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <FirebaseProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/quizmaker" element={<Quizmaker />}/>
      </Routes>
    </Router>
    </FirebaseProvider>
  </React.StrictMode>
);

