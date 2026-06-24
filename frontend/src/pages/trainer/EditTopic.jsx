import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/API";

function EditTopic() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topicName: "",
    description: "",
    videoUrl: "",
    order: "",
  });

  const [loading, setLoading] = useState(true);

  // Snackbar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // FETCH SINGLE TOPIC
  const fetchTopic = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/trainer/topics/${topicId}`);

      const topic = res.data.topic;

      setFormData({
        topicName: topic.topicName || "",
        description: topic.description || "",
        videoUrl: topic.videoUrl || "",
        order: topic.order || "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopic();
  }, [topicId]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE TOPIC
  const handleUpdate = async () => {
    try {
      await API.put(`/trainer/topics/${topicId}`, formData);

      setMessage("Topic updated successfully!");
      setOpen(true);

      setTimeout(() => {
        navigate(-1); // go back to topics list
      }, 1200);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <Box p={3}>
        <Typography>Loading topic...</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* SUCCESS SNACKBAR */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          {message}
        </Alert>
      </Snackbar>

      <Paper sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" mb={3}>
          Edit Topic
        </Typography>

        {/* Topic Name */}
        <TextField
          fullWidth
          label="Topic Name"
          name="topicName"
          value={formData.topicName}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        {/* Video URL */}
        <TextField
          fullWidth
          label="Video URL"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        {/* Order */}
        <TextField
          fullWidth
          label="Order"
          name="order"
          type="number"
          value={formData.order}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        {/* Buttons */}
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleUpdate}
          >
            Update Topic
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default EditTopic;