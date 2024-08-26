import React, {createContext, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const logout = () => {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      };

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated , logout}}>
            {children}
        </AuthContext.Provider>
    )
}