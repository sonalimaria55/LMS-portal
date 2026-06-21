import { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import API from "../../api/API";

function AddTrainer() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "trainer",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await API.post(
                "/admin/trainers",
                formData
            );

            alert(response.data.message || "Trainer added successfully");

            navigate("/admin/dashboard/manageTrainers");
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to create trainer"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: "auto" }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Add Trainer
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Create a new trainer account.
                </Typography>

                <form onSubmit={handleSubmit}>
                    
                    <TextField
                        fullWidth
                        label="Trainer Name"
                        name="name"
                        margin="normal"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        margin="normal"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        type="submit"
                        sx={{ mt: 3 }}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Add Trainer"
                        )}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

export default AddTrainer;