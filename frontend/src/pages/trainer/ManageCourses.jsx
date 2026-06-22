import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import API from "../../api/API";

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    _id: null,
    title: "",
    description: "",
    category: "",
    thumbnail: "",
  });

  // ================= FETCH COURSES =================
  const fetchCourses = async () => {
    try {
      const res = await API.get("/trainer/courses");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= ADD / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form._id) {
        await API.put(`/trainer/courses/${form._id}`, form);
      } else {
        await API.post("/trainer/courses", form);
      }

      setForm({
        _id: null,
        title: "",
        description: "",
        category: "",
        thumbnail: "",
      });

      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await API.delete(`/trainer/courses/${id}`);
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (course) => {
    setForm(course);
  };

  // ================= SEARCH =================
  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: "flex", gap: 3, p: 3 }}>

      {/* ================= FORM ================= */}
      <Paper sx={{ p: 3, width: "35%" }}>

        <Typography variant="h6" mb={2}>
          {form._id ? "Update Course" : "Add Course"}
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            fullWidth
            name="title"
            label="Title"
            value={form.title}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="description"
            label="Description"
            value={form.description}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="category"
            label="Category"
            value={form.category}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="thumbnail"
            label="Thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            margin="normal"
          />

          {/* 🔥 MODERN BUTTON */}
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              py: 1.2,
              fontWeight: "bold",
              borderRadius: "10px",
              background: form._id
                ? "linear-gradient(45deg, #1976d2, #42a5f5)"
                : "linear-gradient(45deg, #2e7d32, #66bb6a)",
              color: "white",
              textTransform: "none",
              fontSize: "15px",
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            {form._id ? "Update Course ✏️" : "Add Course ➕"}
          </Button>

          {form._id && (
            <Button
              fullWidth
              sx={{
                mt: 1,
                borderRadius: "10px",
                textTransform: "none",
                border: "1px solid #ccc",
                color: "#555",
              }}
              onClick={() =>
                setForm({
                  _id: null,
                  title: "",
                  description: "",
                  category: "",
                  thumbnail: "",
                })
              }
            >
              Cancel
            </Button>
          )}

        </form>
      </Paper>

      {/* ================= TABLE ================= */}
      <Box sx={{ flex: 1 }}>

        {/* SEARCH */}
        <TextField
          fullWidth
          label="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Table component={Paper}>

          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <TableRow key={course._id}>

                  <TableCell>{course.title}</TableCell>

                  <TableCell>
                    {course.description?.slice(0, 50)}
                  </TableCell>

                  <TableCell>{course.category}</TableCell>

                  <TableCell align="right">

                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(course)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(course._id)}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No courses found
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>

      </Box>
    </Box>
  );
}

export default ManageCourses;