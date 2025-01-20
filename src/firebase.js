

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";  
import { getAuth } from "firebase/auth"; // For Authentication
import { getDatabase } from "firebase/database"; // For Realtime Database (optional)
import { getFirestore } from "firebase/firestore"; // For Firestore (optional)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuHSLFs-bysmJwslRDPDYTT1yTt5ZR57U",
  authDomain: "quizmaker-2e6cf.firebaseapp.com",
  projectId: "quizmaker-2e6cf",
  storageBucket: "quizmaker-2e6cf.firebasestorage.app",
  messagingSenderId: "347914022457",
  appId: "1:347914022457:web:ce524caef912465fa6e7e8",
  measurementId: "G-CQRJ0HM6PE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// Initialize Firebase services
const auth = getAuth(app); // For Authentication
// const db = getDatabase(app); // For Realtime Database
const firestore = getFirestore(app); // For Firestore

export { auth, firestore };