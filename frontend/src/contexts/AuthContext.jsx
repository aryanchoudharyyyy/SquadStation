import { createContext, useState, useContext } from "react";
const AuthContext = createContext();
export function AuthProvider({ children }){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);   // { id, name, email }
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, email, setEmail, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. Create a Custom Hook (A quick way to turn on the tap)

export function useAuth(){
    return useContext(AuthContext);
}