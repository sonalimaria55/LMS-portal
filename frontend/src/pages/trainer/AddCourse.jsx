import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../../api/API";

function AddCourse() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/trainer/courses", formData);

      alert("Course Added Successfully");

      navigate("/trainer/dashboard/courses");
    } catch (error) {
  console.log(error);
  console.log(error.response?.data);

  alert(
    error.response?.data?.message || "Failed to add course"
  );
}
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
      >
        Add Course
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Course Title"
          name="title"
          margin="normal"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Thumbnail URL"
          name="thumbnail"
          margin="normal"
          value={formData.thumbnail}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Add Course
        </Button>
      </form>
    </Box>
  );
}

export default AddCourse;