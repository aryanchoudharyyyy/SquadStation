import { useState } from "react";
function Login(){
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(){
        if(email.includes('@')){
            setError("");
        console.log("Submitting email: " +email)
        }
        else{
            setError("Please enter a valid email!");
        }
    }

    return <>
    <h1>Login</h1>
    {error!="" && (<p style={{color:"red"}}>{error}</p>)}
    <input type="email" placeholder="College email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <button onClick={handleSubmit}>Submit</button>
    </>
}
export default Login;