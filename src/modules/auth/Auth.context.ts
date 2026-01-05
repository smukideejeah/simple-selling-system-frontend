import { createContext } from "react";

type AuthContextType = {
    token: string | null;
    userId: string | null;
    role: string | null;
    login: (Username: string, Password: string) => Promise<void>;
    logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);


export default AuthContext;