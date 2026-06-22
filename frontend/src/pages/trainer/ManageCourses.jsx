import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import API from "../../api/API";

function ManageCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/trainer/course");

        console.log("Courses Response:", res.data);

        setCourses(res.data.courses);
      } catch (err) {
        console.log("ERROR:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Courses
      </Typography>

      {courses.length === 0 ? (
        <Typography>No courses found</Typography>
      ) : (
        courses.map((course) => (
          <Box
            key={course._id}
            sx={{
              border: "1px solid #ddd",
              p: 2,
              mb: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">
              {course.title}
            </Typography>

            <Typography color="text.secondary">
              {course.description}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
}

export default ManageCourses;