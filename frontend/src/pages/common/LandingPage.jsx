import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default LandingPage;