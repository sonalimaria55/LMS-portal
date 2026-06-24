import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import API from "../../api/API";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await API.get("/trainer/courses");

      // ✅ ONLY published courses
      const publishedCourses = (res.data.data || []).filter(
        (course) => course.isPublished === true
      );

      setCourses(publishedCourses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={3}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Student Dashboard
      </Typography>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Courses Grid */}
      <Grid container spacing={3}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {course.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {course.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ mt: "auto", p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() =>
                      navigate(`/student/course/${course._id}`)
                    }
                  >
                    View Course
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography sx={{ mt: 5, mx: "auto" }}>
            No published courses available
          </Typography>
        )}
      </Grid>
    </Box>
  );
}

export default StudentDashboard;