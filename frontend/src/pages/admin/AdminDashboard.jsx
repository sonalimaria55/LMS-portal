import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import AdminLayout from "./AdminLayout";


function AdminDashboard() {
  const stats = [
    {
      title: "Total Trainers",
      count: 12,
      icon: <GroupsIcon sx={{ fontSize: 50 }} />,
    },
    {
      title: "Total Students",
      count: 250,
      icon: <SchoolIcon sx={{ fontSize: 50 }} />,
    },
    {
      title: "Admin Profile",
      count: "View",
      icon: <PersonIcon sx={{ fontSize: 50 }} />,
    },
  ];

  return (
    
      <Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Welcome Admin 👋
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Manage trainers, students, and monitor platform activity.
        </Typography>

        <Grid container spacing={3}>
          {stats.map((item, index) => (
            <Grid
              key={index}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <Card
                sx={{
                  p: 2,
                  height: "100%",
                  textAlign: "center",
                }}
              >
                <CardContent>
                  {item.icon}

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ mt: 2 }}
                  >
                    {item.count}
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              Recent Activity
            </Typography>

            <Typography>
              • New student registered.
            </Typography>

            <Typography>
              • Trainer account created.
            </Typography>

            <Typography>
              • Student profile updated.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    
  );
}

export default AdminDashboard;


// import React from "react";
// import { Box, Paper, Typography } from "@mui/material";


// const AdminDashboard = () => {
//   return (
//     <>
//       <Typography
//         variant="h4"
//         fontWeight="bold"
//         sx={{ mb: 4 }}
//       >
//         Dashboard
//       </Typography>

//       {/* Stats Cards */}

//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: {
//             xs: "1fr",
//             sm: "1fr 1fr",
//             lg: "repeat(4, 1fr)",
//           },
//           gap: 3,
//         }}
//       >
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography color="text.secondary">
//             Total Trainers
//           </Typography>

//           <Typography variant="h4" fontWeight="bold">
//             24
//           </Typography>
//         </Paper>

//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography color="text.secondary">
//             Total Students
//           </Typography>

//           <Typography variant="h4" fontWeight="bold">
//             245
//           </Typography>
//         </Paper>

//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography color="text.secondary">
//             Active Trainers
//           </Typography>

//           <Typography variant="h4" fontWeight="bold">
//             18
//           </Typography>
//         </Paper>

//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography color="text.secondary">
//             Active Students
//           </Typography>

//           <Typography variant="h4" fontWeight="bold">
//             210
//           </Typography>
//         </Paper>
//       </Box>

//       {/* Recent Activity */}
//       <Paper
//         sx={{
//           mt: 4,
//           p: 3,
//           borderRadius: 3,
//         }}
//       >
//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           mb={2}
//         >
//           Recent Activities
//         </Typography>

//         <Typography sx={{ mb: 1 }}>
//           • New trainer registered
//         </Typography>

//         <Typography sx={{ mb: 1 }}>
//           • New student enrolled
//         </Typography>

//         <Typography sx={{ mb: 1 }}>
//           • Trainer profile updated
//         </Typography>

//         <Typography>
//           • Student assigned to trainer
//         </Typography>
//       </Paper>
//     </>
//   );
// };

// export default AdminDashboard;
//-----------------------------------------------

// import React from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
// } from "@mui/material";

// import GroupsIcon from "@mui/icons-material/Groups";
// import SchoolIcon from "@mui/icons-material/School";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";

// import AdminLayout from "./AdminLayout";

// const AdminDashboard = () => {
//   const cards = [
//     {
//       title: "Total Trainers",
//       value: 24,
//       icon: <GroupsIcon fontSize="large" />,
//       bg: "#E3F2FD",
//     },
//     {
//       title: "Total Students",
//       value: 245,
//       icon: <SchoolIcon fontSize="large" />,
//       bg: "#E8F5E9",
//     },
//     {
//       title: "Total Courses",
//       value: 12,
//       icon: <MenuBookIcon fontSize="large" />,
//       bg: "#FFF3E0",
//     },
//     {
//       title: "Enrollments",
//       value: 189,
//       icon: <TrendingUpIcon fontSize="large" />,
//       bg: "#F3E5F5",
//     },
//   ];

//   return (
  
//       <Box sx={{ p: 2 }}>
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           mb={4}
//         >
//           Dashboard
//         </Typography>

//         {/* Stats Cards */}
//         <Grid container spacing={3}>
//           {cards.map((card) => (
//             <Grid item xs={12} sm={6} md={3} key={card.title}>
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 3,
//                   borderRadius: 3,
//                   backgroundColor: card.bg,
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   height: 130,
//                 }}
//               >
//                 <Box>
//                   <Typography
//                     variant="body1"
//                     color="text.secondary"
//                   >
//                     {card.title}
//                   </Typography>

//                   <Typography
//                     variant="h4"
//                     fontWeight="bold"
//                   >
//                     {card.value}
//                   </Typography>
//                 </Box>

//                 {card.icon}
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Second Row */}
//         <Grid container spacing={3} mt={1}>
//           {/* Recent Students */}
//           <Grid item xs={12} md={8}>
//             <Paper
//               elevation={3}
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//                 height: "100%",
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 fontWeight="bold"
//                 mb={2}
//               >
//                 Recent Students
//               </Typography>

//               <List>
//                 <ListItem>
//                   <ListItemText
//                     primary="Rahul"
//                     secondary="React Course"
//                   />
//                 </ListItem>

//                 <Divider />

//                 <ListItem>
//                   <ListItemText
//                     primary="Priya"
//                     secondary="Java Course"
//                   />
//                 </ListItem>

//                 <Divider />

//                 <ListItem>
//                   <ListItemText
//                     primary="Arjun"
//                     secondary="MERN Stack"
//                   />
//                 </ListItem>
//               </List>
//             </Paper>
//           </Grid>

//           {/* Quick Actions */}
//           <Grid item xs={12} md={4}>
//             <Paper
//               elevation={3}
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 fontWeight="bold"
//                 mb={2}
//               >
//                 Quick Actions
//               </Typography>

//               <Button
//                 variant="contained"
//                 fullWidth
//                 sx={{ mb: 2 }}
//               >
//                 Add Trainer
//               </Button>

//               <Button
//                 variant="contained"
//                 fullWidth
//                 sx={{ mb: 2 }}
//               >
//                 Add Student
//               </Button>

//               <Button
//                 variant="outlined"
//                 fullWidth
//                 sx={{ mb: 2 }}
//               >
//                 View Trainers
//               </Button>

//               <Button
//                 variant="outlined"
//                 fullWidth
//               >
//                 View Students
//               </Button>
//             </Paper>
//           </Grid>
//         </Grid>

//         {/* Recent Activities */}
//         <Paper
//           elevation={3}
//           sx={{
//             p: 3,
//             mt: 3,
//             borderRadius: 3,
//           }}
//         >
//           <Typography
//             variant="h6"
//             fontWeight="bold"
//             mb={2}
//           >
//             Recent Activities
//           </Typography>

//           <List>
//             <ListItem>
//               <ListItemText primary="New trainer registered" />
//             </ListItem>

//             <ListItem>
//               <ListItemText primary="Student enrolled in React Course" />
//             </ListItem>

//             <ListItem>
//               <ListItemText primary="Course details updated" />
//             </ListItem>

//             <ListItem>
//               <ListItemText primary="Student assigned to trainer" />
//             </ListItem>
//           </List>
//         </Paper>
//       </Box>
    
//   );
// };

// export default AdminDashboard;