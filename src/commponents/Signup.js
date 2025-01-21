import React,{useState, useContext}from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../firebaseContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase";


function Signup(){

    const [email,setEmail] = useState('');
    const [Mobile,setMobile] = useState(0);
    const [Password,setPassword] = useState('');
    // const [email,setEmail] = useState('');
    const navigate = useNavigate();

    // const

    async function signupUser(){
        if ( !email || !Mobile || !Password){
            alert("Enter all details");
            return;
        }
        try {
            console.log(auth, email);
            const userCredential = await createUserWithEmailAndPassword(auth, email, Password);
            console.log("User created successfully:", userCredential.user);

            await addDoc(collection(firestore, "users"), {
                uid: userCredential.user.uid,
                email,
                mobile: Mobile,
            });

            navigate('/login');
        } catch (error) {
            console.error("Error creating user:", error.message);
            alert(error.message); // Show user-friendly error
        }
    }
    return(
        <div>
            <label>Email</label>
            <input type="email" value={email} placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}></input>
            <label>Mobile</label>
            <input type="number" value={Mobile} placeholder="Enter your mobile number" onChange={(e)=>{setMobile(e.target.value)}}></input>
            <label>Password</label>
            <input type="password" value={Password} placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button onClick={signupUser}>Submit</button>
            <button onClick={()=>navigate("/")}>Go Back</button>
        </div>
    )
}

export default Signup