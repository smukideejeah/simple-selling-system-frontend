import type { JSX } from "react";
import { Navigate } from "react-router";
import useAuth from "../providers/auth/Auth.hook";
import { Spin } from "antd";

export default function ProtectedRoute({children}: {children: JSX.Element}){
    const auth = useAuth();
    
    if(auth.loading) return <Spin fullscreen />;
    
    if(!auth?.token) return <Navigate to="/login" replace />;

    


    
    return children;
}