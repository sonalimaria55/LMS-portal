import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Avatar,
  Stack,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/API";

function StudentCourses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCourses = async () => {
    try {
      setLoading(true);

      const response = await API.get("/student/courses");

      console.log("Courses Response:", response.data);

      if (response.data.success) {
        // Backend sends: { success, count, courses }
        setCourses(response.data.courses || []);
      }
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to fetch courses"
      );
    } finally {
      setLoading(false);
    }
  };



  const enrollCourse = async (courseId) => {
  try {
    const res = await API.post(
      `/student/enroll/${courseId}`
    );

    alert(res.data.message);

    // Refresh courses (optional for now)
    getCourses();
  } catch (error) {
    console.error(error);

    alert(
      error?.response?.data?.message ||
      "Enrollment failed"
    );
  }
};

  useEffect(() => {
    getCourses();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Available Courses
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Explore and start learning from available courses.
      </Typography>

      <Grid container spacing={3}>
        {courses.length === 0 ? (
          <Grid size={12}>
            <Typography
              align="center"
              color="text.secondary"
            >
              No courses available.
            </Typography>
          </Grid>
        ) : (
          courses.map((course) => (
            <Grid
              key={course._id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    mb={2}
                  >
                    <Avatar>
                      {course.title
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </Avatar>

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      {course.title}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {course.description}
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color="primary"
                  >
                    Trainer
                  </Typography>

                  <Typography>
                    {course.trainer?.name || "N/A"}
                  </Typography>
                </CardContent>

                <Box p={2}>
                 <Box display="flex" gap={1}>
  <Button
    fullWidth
    variant="outlined"
    onClick={() => enrollCourse(course._id)}
  >
    Enroll
  </Button>

  <Button
    fullWidth
    variant="contained"
    onClick={() =>
      navigate(`/student/dashboard/courses/${course._id}`)
    }
  >
    View
  </Button>
</Box>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default StudentCourses;