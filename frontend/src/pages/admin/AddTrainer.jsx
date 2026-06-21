import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";
import API from "../../api/API";

const AddTrainer = () => {
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState({
    name: "",
    email: "",
    password: "",
    role: "trainer",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTrainer({
      ...trainer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post(
        "/admin/trainers",
        trainer
      );

      console.log("Response:", response.data);

      alert("Trainer Added Successfully");

      navigate("/admin/trainers");
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message ||
          "Failed to add trainer"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Card
        elevation={3}
        sx={{
          maxWidth: 800,
          mx: "auto",
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Heading INSIDE card */}
          <Typography variant="h5" fontWeight="bold">
            Add Trainer
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Create a new trainer account
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Name */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Trainer Name"
                  name="name"
                  value={trainer.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Email */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  name="email"
                  value={trainer.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Password */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={trainer.password}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Buttons */}
              <Grid size={{ xs: 12 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Add Trainer"}
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/admin/trainers")}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddTrainer;