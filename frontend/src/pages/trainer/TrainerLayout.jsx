import { Outlet } from "react-router-dom";
import TrainerNavbar from "./TrainerNavbar";
import TrainerSidebar from "./TrainerSidebar";

function TrainerLayout() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Top Navbar */}
      <TrainerNavbar />

      {/* Body */}
      <div style={{ display: "flex", flex: 1 }}>

        {/* Sidebar (placeholder for now) */}
       <TrainerSidebar />
        {/* Nested Pages Render Here */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default TrainerLayout;