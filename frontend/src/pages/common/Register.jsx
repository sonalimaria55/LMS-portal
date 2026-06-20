

import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";

import { Link as RouteLink, useNavigate } from "react-router-dom";
import API from "../../api/API";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Verification States
  const [otpOpen, setOtpOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 1. CLICK VERIFY: Opens popup and sends OTP automatically
  const handleOpenVerification = async () => {
    if (!formData.email) {
      alert("Please enter an email address first.");
      return;
    }

    try {
      setVerifying(true);
      setOtpOpen(true);  //false
      setOtp("");

      await API.post("/otp/send-otp", {   //changed from auth to otp
        email: formData.email,
      });
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to send OTP");
      setOtpOpen(false);
    } finally {
      setVerifying(false);
    }
  };

  // 2. VERIFY OTP INSIDE MODAL
  const handleVerifyOtp = async () => {
    try {
      setVerifying(true);
      await API.post("/otp/verify-otp", {
        email: formData.email,
        otp,
      });

      alert("Email verified successfully!");
      setIsVerified(true);
      setOtpOpen(false);
    } catch (err) {
      alert(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setVerifying(false);
    }
  };

  // 3. FINAL REGISTRATION SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVerified) {
      alert("Please verify your email first.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper sx={{ width: 450, p: 4, borderRadius: 4 }} elevation={4}>
        <Typography variant="h4" textAlign="center" fontWeight={700} mb={3}>
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 1, mb: 1 }}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isVerified || loading}
            />

            <Button
              variant={isVerified ? "text" : "outlined"}
              color={isVerified ? "success" : "primary"}
              sx={{ height: 56, whiteSpace: "nowrap", minWidth: "120px" }}
              onClick={handleOpenVerification}
              disabled={!formData.email || isVerified || verifying}
            >
              {isVerified ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CheckCircleIcon fontSize="small" />
                  Verified
                </Box>
              ) : (
                "Verify"
              )}
            </Button>
          </Box>

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={!isVerified || loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={!isVerified}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={!isVerified || loading}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading || !isVerified}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>

          {/* LOGIN LINK AT THE BOTTOM */}
          <Typography textAlign="center" variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Link
              component={RouteLink}
              to="/login"
              underline="hover"
              fontWeight={600}
              sx={{ color: "primary.main" }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>

      {/* OTP POPUP MODAL */}
      <Dialog open={otpOpen} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 700 }}>Email Verification</DialogTitle>

        <DialogContent>
          <Typography variant="body2" color="text.secondary" mb={2}>
            We are sending an OTP to <strong>{formData.email}</strong>. Please enter it below.
          </Typography>

          <TextField
            fullWidth
            label="Enter OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={verifying}
            autoFocus
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOtpOpen(false)} color="inherit" disabled={verifying}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleVerifyOtp}
            disabled={verifying || !otp}
          >
            {verifying ? <CircularProgress size={20} color="inherit" /> : "Verify OTP"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

//-----------------------------------

// import React, { useState } from "react";
// import {
//   Box,
//   Paper,
//   TextField,
//   Typography,
//   Button,
//   IconButton,
//   InputAdornment,
//   Link,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
// } from "@mui/material";

// import { Link as RouteLink, useNavigate } from "react-router-dom";
// import API from "../../api/API";

// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// export default function Register() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [otpOpen, setOtpOpen] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // REGISTER
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       await API.post("/auth/register", {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//       });

//       setOtpOpen(true); // OPEN MODAL AFTER REGISTER
//     } catch (err) {
//       alert(err?.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // SEND OTP
//   const handleSendOtp = async () => {
//     try {
//       await API.post("/auth/send-otp", {
//         email: formData.email,
//       });

//       setOtpSent(true);
//       alert("OTP sent to email");
//     } catch (err) {
//       alert("Failed to send OTP");
//     }
//   };

//   // VERIFY OTP
//   const handleVerifyOtp = async () => {
//     try {
//       await API.post("/auth/verify-otp", {
//         email: formData.email,
//         otp,
//       });

//       alert("Email verified successfully");

//       setOtpOpen(false);

//       navigate("/login");
//     } catch (err) {
//       alert("Invalid OTP");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "#f8fafc",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         p: 2,
//       }}
//     >
//       <Paper sx={{ width: 450, p: 4, borderRadius: 4 }}>
//         <Typography variant="h4" textAlign="center" fontWeight={700}>
//           Create Account
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Full Name"
//             name="name"
//             margin="normal"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />

//           <Box
//             sx={{
//               display: "flex",
//               gap: 1,
//               alignItems: "center",
//               mt: 2,
//             }}
//           >
//             <TextField
//               fullWidth
//               label="Email Address"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />

//             <Button
//               variant="outlined"
//               sx={{
//                 height: 56,
//                 whiteSpace: "nowrap",
//                 minWidth: "120px",
//               }}
//               onClick={() => {
//                 setOtpOpen(true);
//                 setOtpSent(false);
//                 setOtp("");
//               }}
//               disabled={!formData.email}
//             >
//               Verify
//             </Button>
//           </Box>



//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type={showPassword ? "text" : "password"}
//             margin="normal"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setShowPassword(!showPassword)}>
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TextField
//             fullWidth
//             label="Confirm Password"
//             name="confirmPassword"
//             type={showPassword ? "text" : "password"}
//             margin="normal"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />

//           <Button
//             fullWidth
//             type="submit"
//             variant="contained"
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} /> : "Register"}
//           </Button>
//         </Box>
//       </Paper>

//       {/* OTP MODAL */}
//       {/* OTP MODAL */}
//       <Dialog open={otpOpen} fullWidth maxWidth="sm">
//         <DialogTitle>Email Verification</DialogTitle>

//         <DialogContent>

//           {/* EMAIL DISPLAY */}
//           <Box
//             sx={{
//               mb: 2,
//               p: 2,
//               border: "1px solid #e0e0e0",
//               borderRadius: 2,
//               backgroundColor: "#f9fafb",
//             }}
//           >
//             <Typography variant="body2" color="text.secondary">
//               OTP will be sent to:
//             </Typography>

//             <Typography fontWeight={600}>
//               {formData.email}
//             </Typography>
//           </Box>

//           {/* SEND OTP BUTTON */}
//           <Button
//             variant="contained"
//             sx={{ mb: 2 }}
//             onClick={handleSendOtp}
//             disabled={otpSent}
//           >
//             {otpSent ? "OTP Sent" : "Send OTP"}
//           </Button>

//           {/* OTP INPUT */}
//           {otpSent && (
//             <TextField
//               fullWidth
//               label="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//           )}

//         </DialogContent>

//         <DialogActions>
//           <Button onClick={() => setOtpOpen(false)}>
//             Cancel
//           </Button>

//           {otpSent && (
//             <Button variant="contained" onClick={handleVerifyOtp}>
//               Verify OTP
//             </Button>
//           )}
//         </DialogActions>
//       </Dialog>

//     </Box>
//   );
// }
//--------------------------------
// import React, { useState } from "react";
// import {
//   Box,
//   Paper,
//   TextField,
//   Typography,
//   Button,
//   IconButton,
//   InputAdornment,
//   Link,
// } from "@mui/material";

// import { Link as RouteLink ,useNavigate} from "react-router-dom";
// import API from "../../api/API";

// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import CircularProgress from "@mui/material/CircularProgress";

// export default function Register() {
//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });


//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (formData.password !== formData.confirmPassword) {
//     alert("Passwords do not match");
//     return;
//   }

//   try {
//     setLoading(true);

//     const { data } = await API.post("/auth/register", {
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//     });

//     alert(data.message);

//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });

//     navigate("/login");
//   } catch (error) {
//     console.error(error);

//     alert(
//       error?.response?.data?.message ||
//       "Registration failed"
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "#f8fafc",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         p: 2,
//       }}
//     >
//       <Paper
//         elevation={4}
//         sx={{
//           width: "100%",
//           maxWidth: 450,
//           p: 4,
//           borderRadius: 4,
//         }}
//       >
//         <Typography variant="h4" fontWeight={700} textAlign="center" mb={1}>
//           Create Account
//         </Typography>

//         <Typography
//           variant="body2"
//           color="text.secondary"
//           textAlign="center"
//           mb={4}
//         >
//           Register to continue
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Full Name"
//             name="name"
//             margin="normal"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />

//           <TextField
//             fullWidth
//             label="Email Address"
//             name="email"
//             type="email"
//             margin="normal"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />

//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             type={showPassword ? "text" : "password"}
//             margin="normal"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? (
//                       <VisibilityOff />
//                     ) : (
//                       <Visibility />
//                     )}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TextField
//             fullWidth
//             label="Confirm Password"
//             name="confirmPassword"
//             type={showPassword ? "text" : "password"}
//             margin="normal"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />

//           <Button
//             fullWidth
//             type="submit"
//             variant="contained"
//             disabled={loading}
//           >
//             {loading ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : (
//               "Register"
//             )}
//           </Button>
//           <Typography textAlign="center" mt={3}>
//             Already have an account?{" "}
//             <Link
//               component={RouteLink}
//               to="/login"
//               underline="hover"
//               fontWeight={600}
//             >
//               Login
//             </Link>
//           </Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }
