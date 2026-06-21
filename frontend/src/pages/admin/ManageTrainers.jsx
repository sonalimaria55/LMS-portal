import React, { useEffect, useState } from "react";
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
    CircularProgress,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";
import API from "../../api/API";

const ManageTrainers = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);




    // ---------------- FETCH TRAINERS ----------------
    const fetchTrainers = async () => {
        try {
            setLoading(true);
            const res = await API.get("/admin/trainers");
            setTrainers(res.data.trainers || []);
        } catch (error) {
            console.log(error);
            alert("Failed to load trainers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainers();
    }, []);

    // ---------------- SEARCH ----------------
    const filteredTrainers = trainers.filter(
        (trainer) =>
            trainer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trainer.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ---------------- DELETE ----------------
    const handleDelete = async (id) => {
        try {
            await API.delete(`/admin/trainers/${id}`);
            setTrainers((prev) => prev.filter((t) => t._id !== id));
        } catch (error) {
            console.log(error);
            alert("Delete failed");
        }
    };

    // ---------------- STATUS TOGGLE ----------------
    const handleStatusChange = async (id) => {
        try {
            await API.patch(`/admin/trainers/${id}/status`);

            fetchTrainers();
        } catch (error) {
            console.log(error);
        }
    };

    // ---------------- EDIT (NAVIGATE) ----------------
    const handleEditTrainer = (trainer) => {
        navigate(`/admin/trainers/edit/${trainer._id}`, {
            state: trainer,
        });
    };

    return (
        <Box>
            {/* HEADER */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography variant="h4" fontWeight="bold">
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

            {/* SEARCH */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 3,
                }}
            >
                <TextField
                    fullWidth
                    placeholder="Search trainer by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ maxWidth: "700px" }}
                />

                <Typography variant="h6" fontWeight="bold">
                    Total Trainers: {filteredTrainers.length}
                </Typography>
            </Box>

            {/* TABLE */}
            <Card elevation={3}>
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Profile</strong></TableCell>
                                    <TableCell><strong>ID</strong></TableCell>
                                    <TableCell><strong>Name</strong></TableCell>
                                    <TableCell><strong>Email</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                    <TableCell align="center"><strong>Actions</strong></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : filteredTrainers.length > 0 ? (
                                    filteredTrainers.map((trainer) => (

                                        <TableRow key={trainer._id}>

                                            <TableCell>
                                                <Avatar
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                    }}
                                                >
                                                    {trainer.name?.charAt(0).toUpperCase()}
                                                 {/* <Avatar src={trainer.profileImage} /> */}

                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{trainer._id}</TableCell>

                                            <TableCell>{trainer.name}</TableCell>

                                            <TableCell>{trainer.email}</TableCell>

                                            {/* STATUS */}
                                            <TableCell>
                                                <Box sx={{ display: "flex", gap: 1 }}>
                                                    <Chip
                                                        label={trainer.isActive ? "Active" : "Inactive"}
                                                        sx={{
                                                            bgcolor: trainer.isActive ? "green" : "red",
                                                            color: "white",
                                                        }}
                                                    />

                                                    <Button
                                                        size="small"
                                                        onClick={() =>
                                                            handleStatusChange(trainer._id)
                                                        }
                                                        sx={{
                                                            bgcolor: "#9e9e9e",
                                                            color: "white",
                                                            minWidth: 120,
                                                            textTransform: "none",
                                                            "&:hover": {
                                                                bgcolor: "#757575",
                                                            },
                                                        }}
                                                    >
                                                        {trainer.isActive ? "Deactivate" : "Activate"}
                                                    </Button>
                                                </Box>
                                            </TableCell>

                                            {/* ACTIONS */}
                                            <TableCell align="center">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() =>
                                                        handleEditTrainer(trainer)
                                                    }
                                                >
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton
                                                    color="error"
                                                    onClick={() =>
                                                        handleDelete(trainer._id)
                                                    }
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
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