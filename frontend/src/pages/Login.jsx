import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login(){
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
     const navigate = useNavigate();
   

    function handleSubmit(){
        if(email.includes('@')){
            setError("");
            
            navigate("/otpVerification");
        console.log("Submitting email: " +email)
        }
        else{
            setError("Please enter a valid email!");
        }
    }

    return <div className="auth-container">
        <div className="auth-card">
    <h1>Login</h1>
    {error!="" && (<p style={{color:"red"}}>{error}</p>)}
    <input type="email" placeholder="College email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <button onClick={handleSubmit}>Submit</button>
    </div>
    </div>
}
export default Login;