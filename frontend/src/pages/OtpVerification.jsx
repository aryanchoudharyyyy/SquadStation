import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function OtpVerification(){
    const[otp, setOtp] = useState(["", "", "", "", "", ""]);
    const[timer, setTimer] = useState(30);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const {setIsLoggedIn} = useAuth();
    useEffect(()=>{
        if(timer>0){
            const timeout = setTimeout(()=>{
                setTimer(timer-1);
            }, 1000);
            return ()=> clearTimeout(timeout);
        }
    }, [timer]);
    // Logic for when they type 
    const handleChange = (index, e) =>{
        const value = e.target.value;
        if(isNaN(value)) return; // Stop if they typed a letter 
        const newOtp = [...otp];
         // Only keep the very last number they typed in this specific box   
         newOtp[index] = value.substring(value.length - 1);
         setOtp(newOtp);
          // If they typed a number, and it's not the last box, laser point to the next box and focus it!
          if(value && index<5 && inputRefs.current[index + 1]){
            inputRefs.current[index +1].focus();
          }
    };
    const handleKeyDown = (index, e)=>{
        if(e.key === "Backspace" && !otp[index] && index>0 && inputRefs.current[index-1]){
            inputRefs.current[index-1].focus();
        }
    };
    function handleVerify(){
        setIsLoggedIn(true);
        navigate("/home");
    }
    return (
    <div className="auth-container">
        <div className="auth-card">
            <h1 style={{textAlign: "center", marginBottom:"20px"}}>Enter OTP</h1>
            <div className="otp-container">
                {otp.map((digit, index)=>(
                    <input
                     key ={index}
                      type="text"
                       inputMode="numeric"
                        className="otp-input"
                         value={digit}
                         onChange={(e) => handleChange(index, e)}
                         onKeyDown={(e) => handleKeyDown(index, e)}
                          // This is where we attach the laser pointer to the HTML element!
                        ref={(reference)=> (inputRefs.current[index]=reference)}
                        />

                ))}
                </div>
           
            <button style={{width: "100%"}} onClick={handleVerify}>Verify</button>
             <p className="resend-text">
                Not recieve your code? {" "}
                {timer > 0? (
                    <span style={{fontWeight:500, color: "#1a1a1a"}}>
                        00:{timer<10? `0${timer}` : timer}
                    </span>
                ) : (
                    <button className="resend-link" onClick={()=> setTimer(30)}>Resend Code</button>
                )}
             </p>

        </div>

    </div>
    );
}
export default OtpVerification;