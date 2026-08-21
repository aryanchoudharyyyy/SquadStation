import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function Navbar(){
    const {setIsLoggedIn}= useAuth();
    const navigate = useNavigate();
    function handleLogout(){
        setIsLoggedIn(false);
        navigate("/login");
    }
    return <nav>
        <h1>SquadStation</h1>
        <button onClick={handleLogout}>Logout</button>
    </nav>
}
export default Navbar;