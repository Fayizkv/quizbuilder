import { useNavigate } from "react-router-dom";

function Scoreboard(){

    const navigate = useNavigate()
    return(
        <div>
            <h1> Score Board </h1>
            <button onClick={()=>{navigate("/")}}> Home </button>
        </div>
    )
}

export default Scoreboard;