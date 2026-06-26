import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { useParams } from "react-router-dom";
import API from "../../api/API";

function TopicPlayer() {
  const { topicId } = useParams();

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await API.get(
          `/student/courses/topics/${topicId}`
        );

        console.log("Topic Response:", res.data);
        console.log("Video URL:", res.data.topic.videoUrl);

        setTopic(res.data.topic);
      } catch (error) {
        console.error("Error fetching topic:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [topicId]);

  if (loading) {
    return (
      <Box p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (!topic) {
    return (
      <Box p={3}>
        <Typography variant="h6">
          Topic not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Card elevation={3}>
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            {topic.topicName}
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 3 }}
          >
            {topic.description}
          </Typography>

          {topic.videoUrl ? (
            <video
              width="100%"
              height="500"
              controls
            >
              <source
                src={topic.videoUrl}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Typography color="error">
              No video available.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default TopicPlayer;