import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

import { useNavigate } from "react-router-dom";
import API from "../../api/API";

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await API.get("/trainer/courses");

      setCourses(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/trainer/courses/${id}`);

      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublish = async (id) => {
    try {
      await API.patch(`/trainer/courses/${id}/publish`);

      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">
          Manage Courses
        </Typography>

        <Button
          variant="contained"
          onClick={() =>
            navigate("/trainer/dashboard/courses/add")
          }
        >
          Add Course
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Title</strong>
              </TableCell>

              <TableCell>
                <strong>Description</strong>
              </TableCell>

              <TableCell>
                <strong>Status</strong>
              </TableCell>

              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.title}</TableCell>

                <TableCell>
                  {course.description}
                </TableCell>

                <TableCell>
                  {course.isPublished
                    ? "Published"
                    : "Draft"}
                </TableCell>

                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate(
                        `/trainer/dashboard/courses/edit/${course._id}`
                      )
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() =>
                      handleDelete(course._id)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>

                  <IconButton
                    color="success"
                    onClick={() =>
                      handlePublish(course._id)
                    }
                  >
                    <PublishedWithChangesIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {courses.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                >
                  No Courses Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ManageCourses;