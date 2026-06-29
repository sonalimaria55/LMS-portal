import { useEffect, useState } from "react";
import API from "../../api/API";

import {
    Avatar,
    Box,
    Button,
    Paper,
    Typography,
} from "@mui/material";

function Profile() {
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await API.get("/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(res.data.user);
        } catch (err) {
            console.log(err);
        }
    };

    const uploadProfilePic = async () => {
        if (!file) {
            return alert("Select an image");
        }

        try {
            const formData = new FormData();

            formData.append("profilePic", file);

            const res = await API.put(
                "/user/upload-profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            setUser({
                ...user,
                profilePic: res.data.profilePic,
            });

            alert("Profile picture updated");
        } catch (err) {
            console.log(err);
            alert("Upload failed");
        }
    };

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            mt={5}
        >
            <Paper
                sx={{
                    width: 450,
                    p: 4,
                    textAlign: "center",
                }}
            >
                <Avatar
                    src={
                        user.profilePic
                            ? `http://localhost:5000/${user.profilePic}`
                            : ""
                    }
                    sx={{
                        width: 120,
                        height: 120,
                        margin: "auto",
                        mb: 2,
                    }}
                >
                    {user.name?.charAt(0)}
                </Avatar>

                <Typography variant="h5">
                    {user.name}
                </Typography>

                <Typography color="gray">
                    {user.email}
                </Typography>

                <Typography mt={1}>
                    Role : {user.role}
                </Typography>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setFile(e.target.files[0])
                    }
                    style={{
                        marginTop: 20,
                    }}
                />

                <br />

                <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    onClick={uploadProfilePic}
                >
                    Upload Profile Picture
                </Button>
            </Paper>
        </Box>
    );
}

export default Profile;
