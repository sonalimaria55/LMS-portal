import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api/API";

const AdminEditTrainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const trainer = location.state;
  
  const [name, setName] = useState(trainer?.name || "");
  const [email, setEmail] = useState(trainer?.email || "");

  const handleUpdate = async () => {
    try {
      await API.put(`/admin/trainers/${trainer._id}`, {
        name,
        email,
      });

      alert("Trainer updated successfully");

      navigate("/admin/dashboard/manageTrainers");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4, maxWidth: 600 }}>
        <Typography variant="h4" mb={3}>
          Edit Trainer
        </Typography>

        <TextField
          fullWidth
          label="Trainer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          onClick={handleUpdate}
        >
          Update Trainer
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminEditTrainer;