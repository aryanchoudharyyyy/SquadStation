import { useState } from "react";
function Signup(){
    const[name, setName]= useState("");
    const[email, setEmail] = useState("");
    const[branch, setBranch] =useState("");
    const[year, setYear] = useState("");
    function handleSubmit(){
        console.log("Name: ", name);
        console.log("Email: ", email);
        console.log("Branch: ", branch);
        console.log("Year: ", year);

    }
    return <>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="email" placeholder="Enter your college mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Branch" value={branch} onChange={(e) => setBranch(e.target.value)}/>
        <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
        </>
    
}
export  default Signup;