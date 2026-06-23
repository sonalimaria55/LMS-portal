import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";

import { useNavigate } from "react-router-dom";


const drawerWidth = 250;

function TrainerSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/trainer/dashboard",
    },
    {
      text: "Manage Courses",
      icon: <SchoolIcon />,
      path: "/trainer/dashboard/courses",
    },
    {
      text: "Add Course",
      icon: <AddCircleIcon />,
      path: "/trainer/dashboard/courses/add",
    },
    {
      text: "Edit Course",
      icon: <EditIcon />,
      path: "/trainer/dashboard/courses",
    },
    {
      text: "TrainerDashboardHome",
      icon: <EditIcon />,
      path: "/trainer/dashboard",
    }
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
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default TrainerSidebar;

// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
// } from "@mui/material";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import SchoolIcon from "@mui/icons-material/School";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import EditIcon from "@mui/icons-material/Edit";

// import { useNavigate } from "react-router-dom";

// const drawerWidth = 250;

// function TrainerSidebar() {
//   const navigate = useNavigate();

//   const menuItems = [
//     {
//       text: "Dashboard",
//       icon: <DashboardIcon />,
//       path: "/trainer/dashboard",
//     },
//     {
//       text: "Manage Courses",
//       icon: <SchoolIcon />,
//       path: "/trainer/dashboard/courses",
//     },
//     {
//       text: "Add Course",
//       icon: <AddCircleIcon />,
//       path: "/trainer/dashboard/courses/add",
//     },
//     {
//       text: "Edit Course",
//       icon: <EditIcon />,
//       path: "/trainer/dashboard/courses/edit/1",
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
//       <Toolbar />

//       <List>
//         {menuItems.map((item) => (
//           <ListItemButton
//             key={item.text}
//             onClick={() => navigate(item.path)}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.text} />
//           </ListItemButton>
//         ))}
//       </List>
//     </Drawer>
//   );
// }

// export default TrainerSidebar;