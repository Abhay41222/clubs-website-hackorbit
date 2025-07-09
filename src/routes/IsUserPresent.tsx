import { Navigate, Outlet } from "react-router-dom";

export function UserNotRequired() {
    return <Outlet/>;
}

export function UserRequired() {
    {/* Check if user is present or not with actual logic */}
    const user = true;
    
    return user ? <Outlet/> : <Navigate to="sign-in" replace/>;
}

