import { Outlet } from "react-router-dom";
import TrainerNavbar from "./TrainerNavbar";
import TrainerSidebar from "./TrainerSidebar";

function TrainerLayout() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOP NAVBAR */}
      <TrainerNavbar />

      {/* BODY */}
      <div style={{ display: "flex", flex: 1 }}>
        
        {/* SIDEBAR */}
        <TrainerSidebar />

        {/* MAIN CONTENT */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            marginTop: "64px", // 🔥 THIS FIXES YOUR ISSUE
            overflowY: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default TrainerLayout;