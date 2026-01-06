import React from "react";
import { authService } from "../../shared/di/container";
import AuthContext from "./Auth.context";
import HTTPError from "../../shared/http/HTTPError";


export function AuthProvider({children}: {children: React.ReactNode}) {
    const [token, setToken] = React.useState<string | null>(null);
    const [userId, setUserId] = React.useState<string | null>(null);
    const [role, setRole] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const verifyAuth = async () => {
            try{
                const creds = await authService.verifyAuth();
                if(creds){
                    setToken(creds.token);
                    setUserId(creds.userId);
                    setRole(creds.role);
                }else throw new HTTPError(401, "No autenticado");
                setLoading(false);
                setError(null);
            }catch(error){
                setLoading(false);
                if(error instanceof HTTPError){
                    setToken(null);
                    setUserId(null);
                    setRole(null);
                    setLoading(false);
                    setError(error.message);
                }
                else
                    setError("Error desconocido");
            }
        }

        verifyAuth();
    }, []);

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
        <AuthContext.Provider value={{ token, userId, role, login, logout, error, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

