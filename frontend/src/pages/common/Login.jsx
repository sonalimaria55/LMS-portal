import React, { useState } from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Link,
    IconButton,
    InputAdornment,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import api from "../../api/API";
import loginBanner from "../../assets/login-banner.png";

const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    // Handle Input Changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle Login Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Show Loading State
            setLoading(true);

            // Call Login API
            const response = await api.post(
                "/auth/login",
                formData,
                {
                    withCredentials: true,
                }
            );

            // Store Access Token
            localStorage.setItem(
                "accessToken",
                response.data.accessToken
            );

            //Storage User Details
            localStorage.setItem("user",
                JSON.stringify(response.data.user)
            );

            alert(response.data.message);

        
            // Redirect User Based On Role
            const role = response.data.user.role;

            if (role === "admin") {
                navigate("/admin/dashboard");
            } else if (role === "trainer") {
                navigate("/trainer/dashboard");
            } else if (role === "student") {
                navigate("/student/dashboard");
            }

        } catch (error) {

            // Handle Login Error
            console.error(
                error.response?.data?.message || "Login Failed"
            );

        } finally {

            // Hide Loading State
            setLoading(false);
        }
    };
    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f5f3ff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    width: "100%",
                    maxWidth: "1200px",
                    borderRadius: "24px",
                    overflow: "hidden",
                }}
            >
                <Grid container>
                    {/* LEFT SIDE IMAGE */}
                    <Grid
                        size={{ xs: 12, md: 6 }}
                        sx={{
                            minHeight: { xs: 300, md: 650 },
                            backgroundImage: `url(${loginBanner})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            display: "flex",
                            alignItems: "flex-end",
                            p: 3,
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                bgcolor: "rgba(0,0,0,0.55)",
                                color: "#fff",
                                p: 3,
                                borderRadius: 2,
                            }}
                        >
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Welcome Back
                            </Typography>

                            <Typography>
                                Continue your learning journey with our EduSphere.
                                Access courses, assignments, and track your
                                progress.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* RIGHT SIDE FORM */}
                    <Grid
                        size={{ xs: 12, md: 6 }}
                        sx={{
                            p: { xs: 3, md: 6 },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            bgcolor: "#fff",
                        }}
                    >
                        <Box component="form" onSubmit={handleSubmit}>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                sx={{ mb: 1 }}
                            >
                                Login
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{ mb: 4 }}
                            >
                                Sign in to your EduSphere account
                            </Typography>

                            {/* Email */}
                            <Typography
                                sx={{
                                    mb: 1,
                                    fontWeight: 600,
                                }}
                            >
                                Email Address
                            </Typography>

                            <TextField
                                fullWidth
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            {/* Password */}
                            <Typography
                                sx={{
                                    mt: 3,
                                    mb: 1,
                                    fontWeight: 600,
                                }}
                            >
                                Password
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter your password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                            />

                           

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    mt: 2,
                                }}
                            >
                                <Link
                                    component={RouterLink}
                                    to="/forgot-password"
                                    underline="hover"
                                >
                                    Forgot Password?
                                </Link>
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>

                            <Typography
                                align="center"
                                sx={{
                                    mt: 3,
                                    color: "text.secondary",
                                }}
                            >
                                Don't have an account?{" "}
                                <Link
                                    component={RouterLink}
                                    to="/register"
                                    underline="hover"
                                >
                                    Register
                                </Link>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Login;

