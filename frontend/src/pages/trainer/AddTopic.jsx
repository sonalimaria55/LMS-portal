import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import API from "../../api/API";

function AddTopic() {
  const navigate = useNavigate();

  const { courseId } = useParams();

  console.log("courseId =", courseId);

  const [formData, setFormData] = useState({
    topicName: "",
    description: "",
    videoUrl: "",
    order: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/trainer/topics", {
        ...formData,
        course: courseId,
      });

      navigate(
        `/trainer/dashboard/courses/${courseId}`
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4">
        Add Topic
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Topic Name"
          margin="normal"
          value={formData.topicName}
          onChange={(e) =>
            setFormData({
              ...formData,
              topicName: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          margin="normal"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          label="Video URL"
          margin="normal"
          value={formData.videoUrl}
          onChange={(e) =>
            setFormData({
              ...formData,
              videoUrl: e.target.value,
            })
          }
        />

        <TextField
          fullWidth
          type="number"
          label="Order"
          margin="normal"
          value={formData.order}
          onChange={(e) =>
            setFormData({
              ...formData,
              order: e.target.value,
            })
          }
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Save Topic
        </Button>
      </form>
    </Paper>
  );
}

export default AddTopic;