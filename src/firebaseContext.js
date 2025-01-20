import React,{ Children, createContext, useEffect, useState} from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { child } from "firebase/database";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
import {firestore} from './firebase'


const FirebaseContext = createContext();
// const firestore = getFirestore(app);

const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      return () => unsubscribe();
    }, []);
    return (
        <FirebaseContext.Provider value={{ user, firestore }}>
          {children}
        </FirebaseContext.Provider>
      );
     }



export { FirebaseContext, FirebaseProvider }