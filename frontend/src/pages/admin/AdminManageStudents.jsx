import React from "react";
import {
    Box,
    Paper,
    Typography,
} from "@mui/material";

const AdminManageStudents = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Manage Students
                </Typography>

                <Typography color="text.secondary">
                    Student data
                </Typography>
            </Paper>
        </Box>
    );
};

export default AdminManageStudents;