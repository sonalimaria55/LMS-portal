import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";

const drawerWidth = 240;

const AdminSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Trainers" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Students" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default AdminSidebar;

// import React from "react";
// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Divider,
// } from "@mui/material";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonIcon from "@mui/icons-material/Person";
// import GroupsIcon from "@mui/icons-material/Groups";
// import SchoolIcon from "@mui/icons-material/School";

// const drawerWidth = 240;

// const AdminSidebar = ({ selectedMenu, setSelectedMenu }) => {
//   const menuItems = [
//     {
//       title: "Dashboard",
//       icon: <DashboardIcon />,
//     },
//     {
//       title: "Profile",
//       icon: <PersonIcon />,
//     },
//     {
//       title: "Manage Trainers",
//       icon: <GroupsIcon />,
//     },
//     {
//       title: "Manage Students",
//       icon: <SchoolIcon />,
//     },
//   ];

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//         },
//       }}
//     >
//       {/* Space for Navbar */}
//       <Toolbar />

//       <Divider />

//       <List>
//         {menuItems.map((item) => (
//           <ListItemButton
//             key={item.title}
//             selected={selectedMenu === item.title}
//             onClick={() => setSelectedMenu(item.title)}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>

//             <ListItemText primary={item.title} />
//           </ListItemButton>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default AdminSidebar;