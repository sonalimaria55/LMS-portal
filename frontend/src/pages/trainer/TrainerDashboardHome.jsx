import React from "react";
import { Outlet } from "react-router-dom";

const TrainerDashboardHome = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome Trainer 👋</h1>

      <div style={{ marginTop: "20px" }}>
        <h3>Quick Stats</h3>

        <ul>
          <li>Total Courses: 5</li>
          <li>Active Students: 120</li>
          <li>Pending Reviews: 3</li>
          <div>
            
          </div>
        </ul>
      </div>
    </div>
  );
};

 export default TrainerDashboardHome;
