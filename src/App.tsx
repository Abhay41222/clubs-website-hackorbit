import { Routes, Route } from "react-router-dom";
import Navbar from "./widgets/Navbar";
import Footer from "./widgets/Footer";

import Home from "./public/Home";
import Clubs from "./public/Clubs";
import Events from "./public/Events";
import About from "./public/About";
import SignIn from "./public/SignIn";
import ClubPage from "./public/ClubPage";
import NotFound from "./public/NotFound";

import Profile from "./protected/Profile";
import Dashboard from "./protected/Dashboard";
import FillDetails from "./protected/FillDetails";

import { RequireProfileComplete, RequireProfileIncomplete } from "./routes/IsProfileComplete";
import { UserRequired, UserNotRequired, UserCheck } from "./routes/IsUserPresent";
import { AdminRequired } from "./routes/isUserAdmin";

import AdminDashboard from "./admin/AdminDashboard";
import Confirm from "./public/Confirm";

export default function App() {
  return (
    <>
      {/* Navbar is visible on every route or page */}
      <Navbar />
      <Routes>

        {/* Public Routes */}
        <Route element={<UserNotRequired />}>
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/about" element={<About />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="clubs/:clubId" element={<ClubPage />} />
        </Route>

        <Route element={<UserCheck />}>
          <Route path="/sign-in" element={<SignIn />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<UserRequired />}>
          <Route element={<RequireProfileIncomplete />}>
            <Route path="/fill-details" element={<FillDetails />} />
          </Route>
          <Route element={<RequireProfileComplete />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        {/* Private Routes */}
        <Route element={<AdminRequired />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

      </Routes>
      {/* Footer is visible on every route or page */}
      <Footer />
    </>
  )
}
