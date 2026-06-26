// import { useEffect, useState } from "react";
// import API from "../../api/API";

// import {
//   Avatar,
//   Box,
//   Button,
//   Paper,
//   Typography,
// } from "@mui/material";

// function Profile() {
//   const [user, setUser] = useState(null);
//   const [file, setFile] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await API.get("/auth/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUser(res.data.user);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const uploadProfilePic = async () => {
//     if (!file) {
//       return alert("Select an image");
//     }

//     try {
//       const formData = new FormData();

//       formData.append("profilePic", file);

//       const res = await API.put(
//         "/user/upload-profile",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type":
//               "multipart/form-data",
//           },
//         }
//       );

//       setUser({
//         ...user,
//         profilePic: res.data.profilePic,
//       });

//       alert("Profile picture updated");
//     } catch (err) {
//       console.log(err);
//       alert("Upload failed");
//     }
//   };

//   if (!user) {
//     return <h2>Loading...</h2>;
//   }

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       mt={5}
//     >
//       <Paper
//         sx={{
//           width: 450,
//           p: 4,
//           textAlign: "center",
//         }}
//       >
//         <Avatar
//           src={
//             user.profilePic
//               ? `http://localhost:5000/${user.profilePic}`
//               : ""
//           }
//           sx={{
//             width: 120,
//             height: 120,
//             margin: "auto",
//             mb: 2,
//           }}
//         >
//           {user.name?.charAt(0)}
//         </Avatar>

//         <Typography variant="h5">
//           {user.name}
//         </Typography>

//         <Typography color="gray">
//           {user.email}
//         </Typography>

//         <Typography mt={1}>
//           Role : {user.role}
//         </Typography>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) =>
//             setFile(e.target.files[0])
//           }
//           style={{
//             marginTop: 20,
//           }}
//         />

//         <br />

//         <Button
//           sx={{ mt: 2 }}
//           variant="contained"
//           onClick={uploadProfilePic}
//         >
//           Upload Profile Picture
//         </Button>
//       </Paper>
//     </Box>
//   );
// }

// export default Profile;

import { useEffect, useState, useRef } from "react";
import API from "../../api/API";

import {
    Avatar,
    Box,
    Button,
    Paper,
    Typography,
    CircularProgress,
    Chip,
    Grid,
    Container,
    Divider,
} from "@mui/material";
import {
    PhotoCamera as CameraIcon,
    Check as CheckIcon,
    Close as CancelIcon,
} from "@mui/icons-material";

function Profile() {
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [activeTab, setActiveTab] = useState("profile");
    const fileInputRef = useRef(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await API.get("/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data.user);
        } catch (err) {
            console.error("Failed to fetch profile data.", err);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleCancelSelection = () => {
        setFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const uploadProfilePic = async () => {
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append("profilePic", file);

            const res = await API.put("/user/upload-profile", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setUser({ ...user, profilePic: res.data.profilePic });
            handleCancelSelection();
        } catch (err) {
            console.error(err);
            alert("Failed to update profile picture.");
        }
    };

    if (!user) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#fafafa">
                <CircularProgress size={30} sx={{ color: "#111" }} />
            </Box>
        );
    }

    const avatarSrc = previewUrl
        ? previewUrl
        : user.profilePic
            ? `http://localhost:5000/${user.profilePic}`
            : "";

    return (
        <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh", py: 8 }}>
            <Container maxWidth="lg">
                <Grid container spacing={6}>

                    {/* LEFT COLUMN - USER CARD */}
                    <Grid item xs={12} md={4.5} lg={4}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

                            {/* Profile Avatar */}
                            <Avatar
                                src={avatarSrc}
                                sx={{
                                    width: 132,
                                    height: 132,
                                    fontSize: "2.5rem",
                                    bgcolor: "#f4f4f5",
                                    color: "#71717a",
                                    mb: 3,
                                    border: "1px solid #e4e4e7"
                                }}
                            >
                                {user.name?.charAt(0).toUpperCase()}
                            </Avatar>

                            {/* Identity Details */}
                            <Typography variant="h5" fontWeight="700" sx={{ color: "#09090b", mb: 0.5, letterSpacing: "-0.5px" }}>
                                {user.name}
                            </Typography>

                            <Typography variant="body2" sx={{ color: "#71717a", mb: 3 }}>
                                {user.email}
                            </Typography>

                            {/* Action Upload Inputs */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />

                            {!file ? (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<CameraIcon sx={{ fontSize: 16 }} />}
                                    onClick={() => fileInputRef.current.click()}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: "500",
                                        color: "#27272a",
                                        borderColor: "#e4e4e7",
                                        borderRadius: "6px",
                                        px: 2.5,
                                        py: 0.75,
                                        backgroundColor: "#fff",
                                        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                                        "&:hover": { borderColor: "#d4d4d8", backgroundColor: "#fafafa" }
                                    }}
                                >
                                    Edit profile photo
                                </Button>
                            ) : (
                                <Box sx={{ p: 2, width: "100%", borderRadius: "8px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                                    <Typography variant="caption" sx={{ color: "#166534", fontWeight: "600", display: "block", mb: 1.5 }}>
                                        Commit photo changes?
                                    </Typography>
                                    <Box display="flex" gap={1} justifyContent="center">
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="success"
                                            startIcon={<CheckIcon />}
                                            onClick={uploadProfilePic}
                                            sx={{ textTransform: "none", borderRadius: "6px", px: 2 }}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            startIcon={<CancelIcon />}
                                            onClick={handleCancelSelection}
                                            sx={{ textTransform: "none", borderRadius: "6px", px: 2 }}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Grid>

                    {/* RIGHT COLUMN - MAIN HORIZONTAL PANELS */}
                    <Grid item xs={12} md={7.5} lg={8}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4.5,
                                borderRadius: "12px",
                                border: "1px solid #e4e4e7",
                                backgroundColor: "#ffffff",
                                boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)"
                            }}
                        >
                            {/* Horizontally Long Navigation Bar */}
                            <Box sx={{ display: "flex", gap: 5, borderBottom: "1px solid #f4f4f5", width: "100%", mb: 4 }}>
                                {["profile", "activity", "projects", "teams"].map((tab) => (
                                    <Typography
                                        key={tab}
                                        variant="body2"
                                        fontWeight="600"
                                        onClick={() => setActiveTab(tab)}
                                        sx={{
                                            pb: 2,
                                            textTransform: "capitalize",
                                            cursor: "pointer",
                                            color: activeTab === tab ? "#09090b" : "#a1a1aa",
                                            borderBottom: activeTab === tab ? "2px solid #09090b" : "2px solid transparent",
                                            transition: "all 0.2s ease",
                                            "&:hover": { color: "#52525b" }
                                        }}
                                    >
                                        {tab === "profile" ? "Activity" : tab}
                                    </Typography>
                                ))}
                            </Box>

                            {/* Dynamic Content Details View */}
                            {activeTab === "profile" && (
                                <Box>
                                    <Typography variant="caption" fontWeight="700" sx={{ color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "1px", display: "block", mb: 3 }}>
                                        About User
                                    </Typography>

                                    {/* Clean text entries reminiscent of the screenshot */}
                                    <Box sx={{ py: 1.5 }}>
                                        <Typography variant="body2" color="#71717a" mb={0.5}>Account Email Address</Typography>
                                        <Typography variant="body1" fontWeight="500" color="#09090b">{user.email}</Typography>
                                    </Box>

                                    <Divider sx={{ my: 1.5, borderColor: "#f4f4f5" }} />

                                    <Box sx={{ py: 1.5 }}>
                                        <Typography variant="body2" color="#71717a" mb={1}>Current Workspace Privilege Level</Typography>
                                        <Chip
                                            label={user.role ? user.role.toUpperCase() : "STANDARD MEMBER"}
                                            size="small"
                                            sx={{
                                                fontSize: "0.65rem",
                                                fontWeight: "700",
                                                color: "#27272a",
                                                backgroundColor: "#f4f4f5",
                                                borderRadius: "4px",
                                                height: 22
                                            }}
                                        />
                                    </Box>
                                </Box>
                            )}

                            {activeTab === "activity" && (
                                <Typography variant="body2" color="#71717a">Historical user session feeds match here.</Typography>
                            )}

                            {activeTab === "projects" && (
                                <Typography variant="body2" color="#71717a">Active platform projects view details.</Typography>
                            )}

                            {activeTab === "teams" && (
                                <Typography variant="body2" color="#71717a">Assigned space user group view details.</Typography>
                            )}
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}

export default Profile;