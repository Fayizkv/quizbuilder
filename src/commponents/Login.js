import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Quiz from './Quiz';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function loginUser() {
        if (!email || !password) {
            alert("Enter all details");
            return;
        }
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
    }


    return (
        <div>
            <label>Email</label>
            <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={loginUser}>Login</button>
            <button onClick={() => Navigate("/")}>Go Back</button>
            {/* <Quiz /> */}
        </div>
    );
}

export default Login;