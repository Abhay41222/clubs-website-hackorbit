import { Navigate, Outlet } from "react-router-dom";

{/* Simulate user profile state (replace with real logic) */}
const isProfileComplete = true;

{/* Guard for the fill-details route (only if profile is incomplete) */}
export function RequireProfileIncomplete() {
  if (isProfileComplete) {
    return <Navigate to="/profile" replace />;
  }
  return <Outlet />;
}

{/* Guard for routes that require profile to be complete */}
export function RequireProfileComplete() {
  if (!isProfileComplete) {
    return <Navigate to="/fill-details" replace />;
  }
  return <Outlet />;
}

