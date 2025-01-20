import React,{useContext} from "react";
import { FirebaseContext } from './firebaseContext';

import { useNavigate } from 'react-router-dom';

function App() {

  const {user} = useContext(FirebaseContext);
  const navigate = useNavigate();

  return (
    <div className="App">
        <button onClick={()=>navigate('/login')}>Login</button>
        <button onClick={()=>navigate('/quizmaker')}>Make Quiz</button>
        <button onClick={()=>navigate('/quizmakerauto')}>Automatic Quiz Generator</button>

     {/* {user ? console.log(user) : 'not logged in'} */}
    </div>
  );
}

export default App;
