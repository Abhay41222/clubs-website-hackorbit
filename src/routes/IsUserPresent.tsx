import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export function UserNotRequired() {
    return <Outlet />;
}

export function UserRequired() {
    const { user } = useAuth();
    return user ? <Outlet /> : <Navigate to="sign-in" replace />;
}

export function UserCheck (){
    const { user } = useAuth();
    return user ? <Navigate to="dashboard" replace/> : <Outlet/>;
}
