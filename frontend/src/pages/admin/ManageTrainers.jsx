import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Chip,
  InputAdornment,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";

const ManageTrainers = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@gmail.com",
      active: true,
    },
    {
      id: 2,
      name: "David Wilson",
      email: "david@gmail.com",
      active: false,
    },
    {
      id: 3,
      name: "Robert Brown",
      email: "robert@gmail.com",
      active: true,
    },
    {
      id: 4,
      name: "Michael Johnson",
      email: "michael@gmail.com",
      active: false,
    },
  ]);

  const filteredTrainers = trainers.filter(
    (trainer) =>
      trainer.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      trainer.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id) => {
    setTrainers((prev) =>
      prev.map((trainer) =>
        trainer.id === id
          ? {
              ...trainer,
              active: !trainer.active,
            }
          : trainer
      )
    );
  };

  const handleDelete = (id) => {
    setTrainers((prev) =>
      prev.filter((trainer) => trainer.id !== id)
    );
  };

  const handleEditTrainer = (trainer) => {
    alert(`Edit Trainer: ${trainer.name}`);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Manage Trainers
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            navigate("/admin/dashboard/addTrainer")
          }
        >
          Add Trainer
        </Button>
      </Box>

      {/* Search */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search trainer by name or email..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: "700px",
          }}
        />

        <Typography
          variant="h6"
          fontWeight="bold"
        >
          Total Trainers: {filteredTrainers.length}
        </Typography>
      </Box>

      {/* Trainers Table */}
      <Card elevation={3}>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>ID</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>

                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>

                  <TableCell align="center">
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredTrainers.map(
                  (trainer) => (
                    <TableRow key={trainer.id}>
                      <TableCell>
                        {trainer.id}
                      </TableCell>

                      <TableCell>
                        {trainer.name}
                      </TableCell>

                      <TableCell>
                        {trainer.email}
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Chip
                            label={
                              trainer.active
                                ? "Active"
                                : "Inactive"
                            }
                            color={
                              trainer.active
                                ? "success"
                                : "error"
                            }
                            size="small"
                          />

                          <Button
                            variant="contained"
                            size="small"
                            onClick={() =>
                              handleStatusChange(
                                trainer.id
                              )
                            }
                            sx={{
                              bgcolor: "#9e9e9e",
                              color: "white",
                              minWidth: 110,
                              textTransform:
                                "none",
                              "&:hover": {
                                bgcolor:
                                  "#757575",
                              },
                            }}
                          >
                            {trainer.active
                              ? "Deactivate"
                              : "Activate"}
                          </Button>
                        </Box>
                      </TableCell>

                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleEditTrainer(
                              trainer
                            )
                          }
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          color="error"
                          onClick={() =>
                            handleDelete(
                              trainer.id
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                )}

                {filteredTrainers.length ===
                  0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="center"
                    >
                      No trainers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ManageTrainers;

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Switch,
//   IconButton,
//   TextField,
//   Chip,
// } from "@mui/material";

// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SearchIcon from "@mui/icons-material/Search";
// import { useNavigate } from "react-router-dom";

// const ManageTrainers = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate=useNavigate();

//   const [trainers, setTrainers] = useState([
//     {
//       id: 1,
//       name: "John Smith",
//       email: "john@gmail.com",
//       active: true,
//     },
//     {
//       id: 2,
//       name: "David Wilson",
//       email: "david@gmail.com",
//       active: false,
//     },
//     {
//       id: 3,
//       name: "Robert Brown",
//       email: "robert@gmail.com",
//       active: true,
//     },
//     {
//       id: 4,
//       name: "Michael Johnson",
//       email: "michael@gmail.com",
//       active: false,
//     },
//   ]);

//   const filteredTrainers = trainers.filter(
//     (trainer) =>
//       trainer.name
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       trainer.email
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//   );

//   const handleStatusChange = (id) => {
//     setTrainers((prev) =>
//       prev.map((trainer) =>
//         trainer.id === id
//           ? {
//               ...trainer,
//               active: !trainer.active,
//             }
//           : trainer
//       )
//     );
//   };

//   const handleDelete = (id) => {
//     setTrainers((prev) =>
//       prev.filter((trainer) => trainer.id !== id)
//     );
//   };

//   const handleAddTrainer = () => {
//     alert("Add Trainer Form Coming Soon");
//   };

//   const handleEditTrainer = (trainer) => {
//     alert(`Edit Trainer: ${trainer.name}`);
//   };

//   return (
//     <Box>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//         >
//           Manage Trainers
//         </Typography>

//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={()=>navigate("/admin/dashboard/addTrainer")}
//         >
//           Add Trainer
//         </Button>
//       </Box>

//       {/* Search Bar */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           gap: 2,
//           mb: 3,
//         }}
//       >
//         <TextField
//           fullWidth
//           placeholder="Search trainer by name or email..."
//           value={searchTerm}
//           onChange={(e) =>
//             setSearchTerm(e.target.value)
//           }
//           InputProps={{
//             startAdornment: (
//               <SearchIcon
//                 sx={{
//                   mr: 1,
//                   color: "text.secondary",
//                 }}
//               />
//             ),
//           }}
//           sx={{
//             maxWidth: "700px",
//           }}
//         />

//         <Typography
//           variant="h6"
//           fontWeight="bold"
//         >
//           Total Trainers: {filteredTrainers.length}
//         </Typography>
//       </Box>

//       {/* Trainers Table */}
//       <Card elevation={3}>
//         <CardContent>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <strong>ID</strong>
//                   </TableCell>

//                   <TableCell>
//                     <strong>Name</strong>
//                   </TableCell>

//                   <TableCell>
//                     <strong>Email</strong>
//                   </TableCell>

//                   <TableCell>
//                     <strong>Status</strong>
//                   </TableCell>

//                   <TableCell align="center">
//                     <strong>Actions</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {filteredTrainers.map(
//                   (trainer) => (
//                     <TableRow key={trainer.id}>
//                       <TableCell>
//                         {trainer.id}
//                       </TableCell>

//                       <TableCell>
//                         {trainer.name}
//                       </TableCell>

//                       <TableCell>
//                         {trainer.email}
//                       </TableCell>

//                       <TableCell>
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems:
//                               "center",
//                             gap: 1,
//                           }}
//                         >
//                           <Chip
//                             label={
//                               trainer.active
//                                 ? "Active"
//                                 : "Inactive"
//                             }
//                             color={
//                               trainer.active
//                                 ? "success"
//                                 : "error"
//                             }
//                             size="small"
//                           />

//                           <Switch
//                             checked={
//                               trainer.active
//                             }
//                             onChange={() =>
//                               handleStatusChange(
//                                 trainer.id
//                               )
//                             }
//                           />
//                         </Box>
//                       </TableCell>

//                       <TableCell align="center">
//                         <IconButton
//                           color="primary"
//                           onClick={() =>
//                             handleEditTrainer(
//                               trainer
//                             )
//                           }
//                         >
//                           <EditIcon />
//                         </IconButton>

//                         <IconButton
//                           color="error"
//                           onClick={() =>
//                             handleDelete(
//                               trainer.id
//                             )
//                           }
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   )
//                 )}

//                 {filteredTrainers.length ===
//                   0 && (
//                   <TableRow>
//                     <TableCell
//                       colSpan={5}
//                       align="center"
//                     >
//                       No trainers found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default ManageTrainers;