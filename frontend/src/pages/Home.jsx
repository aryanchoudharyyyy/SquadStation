import { useAuth } from "../contexts/AuthContext";
function Home(){
    const {isLoggedIn} = useAuth();
        return (
    <div style={{padding: "50px", textAlign: "center"}}>
     <h1>Welcome to SquadStation</h1>
     <p>Find your buddies</p>
     <h2>
        Status: {isLoggedIn? "LOGGED IN 🟢" : "LOGGED OUT 🔴"}
     </h2>
     </div>
    );

}
export default Home;