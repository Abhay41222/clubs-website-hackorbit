import {Navigate, Outlet} from "react-router-dom";

export function AdminRequired() {
    {/* actual logic to check  */}
    const isUserAdmin = true; 

    return isUserAdmin ? <Outlet/> : <Navigate to="/" replace/>;
}