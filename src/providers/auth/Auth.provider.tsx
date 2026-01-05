import React from "react";
import { authService } from "../../shared/di/container";
import AuthContext from "./Auth.context";
import HTTPError from "../../shared/http/HTTPError";


export function AuthProvider({children}: {children: React.ReactNode}) {
    const [token, setToken] = React.useState<string | null>(null);
    const [userId, setUserId] = React.useState<string | null>(null);
    const [role, setRole] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const login = async (Username: string, Password: string) => {
        try{
            const newToken = await authService.login(Username, Password);
            setToken(newToken.token);
            setUserId(newToken.userId);
            setRole(newToken.role);
            setError(null);
        }catch(err){
            if(err instanceof HTTPError)
                setError(err.message);
            else
                setError("Error desconocido");
            
        }
    };

    const logout = () => {
        authService.logout();
        setToken(null);
        setUserId(null);
        setRole(null);
        setError(null);
    };

    return (
        <AuthContext.Provider value={{ token, userId, role, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    )
}

