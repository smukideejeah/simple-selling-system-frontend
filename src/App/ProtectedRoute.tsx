import type { JSX } from "react";
import { Navigate } from "react-router";
import useAuth from "../providers/auth/Auth.hook";

export default function ProtectedRoute({children}: {children: JSX.Element}){
    const auth = useAuth();
    if(!auth?.token) return <Navigate to="/login" replace />;
    
    return children;
}