import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isOnboardingPage = location.pathname === "/onboarding";
  const isAuthPage = location.pathname === "/signin";
  const isMeditationSession = location.pathname === "/meditation/session";

  return (
    <>
      {!isLandingPage &&
        !isAuthPage &&
        !isMeditationSession &&
        !isOnboardingPage && <Navbar />}
      <Outlet />
      {!isAuthPage &&
       !isMeditationSession &&
       !isOnboardingPage && <Footer />
      }
    </>
  );
}
