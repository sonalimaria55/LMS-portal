import React from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";

const AdminProfile = () => {
  const admin = JSON.parse(localStorage.getItem("user"));

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={4}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mb: 2,
            }}
          >
            {admin?.name?.charAt(0).toUpperCase()}
          </Avatar>

          <Typography variant="h4">
            Admin Profile
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">
              Name
            </Typography>

            <Typography>
              {admin?.name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">
              Email
            </Typography>

            <Typography>
              {admin?.email}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">
              Role
            </Typography>

            <Typography>
              {admin?.role}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AdminProfile;