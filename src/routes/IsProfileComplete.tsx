import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { isProfileComplete as checkIsProfileComplete } from "../services/supabaseFunctions";

{/* Guard for the fill-details route (only if profile is incomplete) */ }
export function RequireProfileIncomplete() {
  const { user } = useAuth();
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If no user, we don't need to check profile completeness
    if (!user) {
      setIsLoading(false);
      return;
    }

    // Check if profile is complete
    const checkProfile = async () => {
      if (user?.id) {
        try {
          const profileComplete = await checkIsProfileComplete(user.id);
          setIsComplete(profileComplete);
        } catch (error) {
          console.error("Error checking profile completeness:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkProfile();
  }, [user]);

  // Show loading while checking profile status
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If no user, redirect to sign-in
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  // If email not confirmed, redirect to confirm page
  if (user.email_confirmed_at === undefined || user.email_confirmed_at === null) {
    return <Navigate to="/confirm" replace />;
  }

  // If profile is complete, redirect to profile page
  if (isComplete) {
    return <Navigate to="/profile" replace />;
  }

  // Otherwise, allow access to fill-details
  return <Outlet />;
}

{/* Guard for routes that require profile to be complete */ }
export function RequireProfileComplete() {
  const { user } = useAuth();
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If no user, we don't need to check profile completeness
    if (!user) {
      setIsLoading(false);
      return;
    }

    // Check if profile is complete
    const checkProfile = async () => {
      if (user?.id) {
        try {
          const profileComplete = await checkIsProfileComplete(user.id);
          setIsComplete(profileComplete);
        } catch (error) {
          console.error("Error checking profile completeness:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkProfile();
  }, [user]);

  // Show loading while checking profile status
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If no user, redirect to sign-in
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  // If email not confirmed, redirect to confirm page
  if (user.email_confirmed_at === undefined || user.email_confirmed_at === null) {
    return <Navigate to="/confirm" replace />;
  }

  // If profile is not complete, redirect to fill-details
  if (!isComplete) {
    return <Navigate to="/fill-details" replace />;
  }

  // Otherwise, allow access to protected routes
  return <Outlet />;
}

