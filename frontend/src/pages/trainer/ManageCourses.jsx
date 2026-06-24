
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
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useNavigate } from "react-router-dom";
import API from "../../api/API";

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await API.get("/trainer/courses");

      console.log("API RESPONSE:", res.data.data);

      setCourses(res.data.data || []);
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

  const filteredCourses = courses.filter((course) =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={3}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Manage Courses
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={() =>
            navigate("/trainer/dashboard/courses/add")
          }
        >
          Add Course
        </Button>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Table */}
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

              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>
                    {course.title}
                  </TableCell>

                  <TableCell>
                    {course.description}
                  </TableCell>

                  <TableCell>
                    {course.isPublished
                      ? "Published"
                      : "Draft"}
                  </TableCell>

                  <TableCell align="center">

                    {/* Topics */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() =>
                        navigate(
                          `/trainer/dashboard/courses/topic/${course._id}`
                        )
                      }
                      sx={{ mr: 1 }}
                    >
                      Topics
                    </Button>

                    {/* Add Topic */}
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(
                          `/trainer/dashboard/courses/${course._id}/topics/add`
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    {/* Delete */}
                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(course._id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>

                    {/* Publish */}
                    <IconButton
                      color="success"
                      onClick={() =>
                        handlePublish(course._id)
                      }
                    >
                      <PublishedWithChangesIcon />
                    </IconButton>

                    <Button
                      variant="contained"
                      size="small"
                      color={
                        course.isPublished
                          ? "success"
                          : "primary"
                      }
                      onClick={() =>
                        handlePublish(course._id)
                      }
                    >
                      {course.isPublished
                        ? "Published"
                        : "Publish"}
                    </Button>

                  </TableCell>
                </TableRow>
              ))
            ) : (
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