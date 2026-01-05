import React from "react";
import { authService } from "../../shared/di/container";
import AuthContext from "./Auth.context";


export function AuthProvider({children}: {children: React.ReactNode}) {
    const [token, setToken] = React.useState<string | null>(null);
    const [userId, setUserId] = React.useState<string | null>(null);
    const [role, setRole] = React.useState<string | null>(null);

    const login = async (Username: string, Password: string) => {
        const newToken = await authService.login(Username, Password);
        setToken(newToken.token);
        setUserId(newToken.userId);
        setRole(newToken.role);
    };

    const logout = () => {
        authService.logout();
        setToken(null);
        setUserId(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ token, userId, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

