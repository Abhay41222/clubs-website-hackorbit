import { Navigate, Outlet } from "react-router-dom";

export function ModeratorRequired() {
    const isUserModerator = true;

    return isUserModerator ? <Outlet/> : <Navigate to="/"/>
}