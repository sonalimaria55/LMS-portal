import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

import API from "../../api/API";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/trainer/course/${id}`);

        setFormData({
          courseName: res.data.course.title,
          description: res.data.course.description,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/trainer/course/${id}`, formData);

      console.log("Course updated");

      navigate("/trainer/dashboard/courses");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Edit Course
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Update course details.
      </Typography>

      <Card>
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Course Name"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  type="submit"
                  variant="contained"
                >
                  Update Course
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default EditCourse;