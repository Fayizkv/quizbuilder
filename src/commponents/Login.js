import React from 'react';
import { useNavigate } from 'react-router-dom';
import Quiz from './Quiz';

function Login() {
    const Navigate = useNavigate();
    return (
        <div>
            <label> Enter username
                <input type="name" Enter username />
            </label>
            <label> Enter Password
                <input type="password" Enter Password />
            </label>
            <Quiz />
            <button onClick={() => { Navigate('/') }}> Go Back </button>
        </div>
    )
}

export default Login;