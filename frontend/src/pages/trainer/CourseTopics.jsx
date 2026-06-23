import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
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

import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/API";

function CourseTopics() {
  const { id: courseId } = useParams();  //important scanario
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTopics = async () => {
    try {
      const res = await API.get(
        `/trainer/topics/courses/${courseId}`
      );

      setTopics(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [courseId]);

  const handleDelete = async (topicId) => {
    try {
      await API.delete(
        `/trainer/topics/${topicId}`
      );

      fetchTopics();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTopics = topics.filter((topic) =>
    topic.topicName
      ?.toLowerCase()
      .includes(search.toLowerCase())
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
        <Typography variant="h4">
          Course Topics
        </Typography>

        <Button
          variant="contained"
          onClick={() =>
            navigate(
              `/trainer/dashboard/courses/${courseId}/topics/add`
            )
          }
        >
          Add Topic
        </Button>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        label="Search Topic"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        sx={{ mb: 3 }}
      />

      {/* Topics Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Order</strong>
              </TableCell>

              <TableCell>
                <strong>Topic Name</strong>
              </TableCell>

              <TableCell>
                <strong>Description</strong>
              </TableCell>

              <TableCell>
                <strong>Video</strong>
              </TableCell>

              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => (
                <TableRow key={topic._id}>
                  <TableCell>
                    {topic.order}
                  </TableCell>

                  <TableCell>
                    {topic.topicName}
                  </TableCell>

                  <TableCell>
                    {topic.description}
                  </TableCell>

                  <TableCell>
                    <a
                      href={topic.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Video
                    </a>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(
                          `/trainer/dashboard/topics/edit/${topic._id}`
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(topic._id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                >
                  No Topics Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CourseTopics;