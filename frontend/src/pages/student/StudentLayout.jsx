import React from "react";
import StudentNavbar from "./StudentNavbar";
import StudentSidebar from "./StudentSidebar";

function StudentLayout({ children }) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <StudentNavbar />

      {/* Body */}
      <div
        style={{
          display: "flex",
          flex: 1,
        }}
      >
        {/* Sidebar */}
        <StudentSidebar />

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            marginTop: "64px",
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default StudentLayout;