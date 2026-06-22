import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/API";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
  });

  // FETCH single course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/trainer/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchCourse();
  }, [id]);

  // handle change
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // update course
  const handleUpdate = async () => {
    try {
      await API.put(`/trainer/courses/${id}`, course);

      navigate("/trainer/dashboard/courses");
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  return (
    <Box p={3} maxWidth={500}>
      <Typography variant="h5" mb={2}>
        Edit Course
      </Typography>

      <TextField
        fullWidth
        label="Title"
        name="title"
        value={course.title}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Description"
        name="description"
        value={course.description}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Price"
        name="price"
        value={course.price}
        onChange={handleChange}
        margin="normal"
      />

      <Button
        variant="contained"
        fullWidth
        onClick={handleUpdate}
        sx={{ mt: 2 }}
      >
        Update Course
      </Button>
    </Box>
  );
}

export default EditCourse;