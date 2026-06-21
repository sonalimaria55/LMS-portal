import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AdminNavbar />

      <AdminSidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt:5
        }}
      >
      

        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;

