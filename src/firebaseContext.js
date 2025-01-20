import React,{ Children, createContext, useEffect, useState} from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { child } from "firebase/database";

const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      return () => unsubscribe();
    }, []);
    return (
        <FirebaseContext.Provider value={{ user }}>
          {children}
        </FirebaseContext.Provider>
      );
     }



export { FirebaseContext, FirebaseProvider }