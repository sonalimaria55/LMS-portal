import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";

const AdminNavbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
          }}
        >
          Admin Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body1">
            Admin
          </Typography>

          <Avatar>A</Avatar>

          <IconButton
            color="inherit"
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;


// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Avatar,
//   IconButton,
// } from "@mui/material";

// import LogoutIcon from "@mui/icons-material/Logout";

// const AdminNavbar = () => {
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: (theme) => theme.zIndex.drawer + 1,
//       }}
//     >
//       <Toolbar>
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: 600,
//             flexGrow: 1,
//           }}
//         >
//           Admin Dashboard
//         </Typography>

//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//           }}
//         >
//           <Typography variant="body1">
//             Admin
//           </Typography>

//           <Avatar>A</Avatar>

//           <IconButton
//             color="inherit"
//             onClick={handleLogout}
//           >
//             <LogoutIcon />
//           </IconButton>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default AdminNavbar;