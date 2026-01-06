import type { JSX } from "react";
import { Navigate } from "react-router";
import useAuth from "../providers/auth/Auth.hook";
import { Spin } from "antd";
import type { Role } from "../providers/auth/Auth.type";

export default function ProtectedRoleRoute({children, allowedRoles}: {children: JSX.Element, allowedRoles?: Role[]}){
    const auth = useAuth();
    
    if(auth.loading) return <Spin fullscreen />;
    
    if(allowedRoles  && !allowedRoles.includes(auth.role as Role)) return <Navigate to="/" replace />;
    
    return children;
}