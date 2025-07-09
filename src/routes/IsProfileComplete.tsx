import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

{/* Guard for the fill-details route (only if profile is incomplete) */ }
export function RequireProfileIncomplete() {
  const { user } = useAuth();  
  const isProfileComplete = user?.id ?? false;
  if (user?.id) {
    // check if the user exists in table if not set profileComplete to false
    // if it exists then check teh isProfileComplete 
  }

  if (isProfileComplete) {
    return <Navigate to="/profile" replace />;
  }
  return <Outlet />;
}

{/* Guard for routes that require profile to be complete */ }
export function RequireProfileComplete() {
  const { user } = useAuth();
  const isProfileComplete = user?.id ?? false;
  if (!isProfileComplete) {
    return <Navigate to="/fill-details" replace />;
  }
  return <Outlet />;
}

