import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/API";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await API.get(`/trainer/courses/${id}`);

      setFormData({
        title: res.data.data.title || "",
        description: res.data.data.description || "",
        thumbnail: res.data.data.thumbnail || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/trainer/courses/${id}`,
        formData
      );

      alert("Course Updated Successfully");

      navigate("/trainer/dashboard/courses");
    } catch (error) {
      console.log(error);
      alert("Failed to update course");
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
      <Typography variant="h5" gutterBottom>
        Edit Course
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Course Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Thumbnail URL"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Update Course
        </Button>
      </form>
    </Box>
  );
}

export default EditCourse;