import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { useNavigate } from "react-router-dom";

const drawerWidth = 250;

function AdminSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin/dashboard",
    },
    {
      text: "Profile",
      icon: <PersonIcon />,
      path: "/admin/profile",
    },
    {
      text: "Manage Trainers",
      icon: <GroupsIcon />,
      path: "/admin/dashboard/manageTrainers",
    },
    {
      text: "Manage Students",
      icon: <SchoolIcon />,
      path: "/admin/students",
    },
  ];

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
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.text}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

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