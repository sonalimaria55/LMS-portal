import React from "react";
import { Box, Toolbar } from "@mui/material";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Navbar */}
      <AdminNavbar />

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        {/* Space below AppBar */}
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;


// import React from "react";
// import { Box, Toolbar } from "@mui/material";
// import AdminNavbar from "./AdminNavbar";
// import AdminSidebar from "./AdminSidebar";
// import { Outlet } from "react-router-dom";

// const AdminLayout = ({ children }) => {
//   return (
//     <Box sx={{ display: "flex" }}>


        
//       {/* Left Sidebar */}
//       <AdminSidebar />
//       {/* Top Navbar */}
//       <AdminNavbar />


//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//         }}
//       >
//         {/* Creates space below AppBar */}
//         <Toolbar />
//         <Outlet/>

//         {children}
//       </Box>
//     </Box>
//   );
// };

// export default AdminLayout;