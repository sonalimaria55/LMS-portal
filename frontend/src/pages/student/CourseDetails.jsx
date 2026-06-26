import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/API";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopics = async () => {
    try {
      const res = await API.get(
        `/student/courses/${courseId}/topics`
      );

      console.log("Topics Response:", res.data);

      setTopics(res.data.topics || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [courseId]);

  if (loading) {
    return (
      <Box p={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Course Topics
      </Typography>

      {topics.length === 0 ? (
        <Typography>No topics found.</Typography>
      ) : (
        topics.map((topic) => (
          <Card key={topic._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {topic.order}. {topic.topicName}
              </Typography>

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {topic.description}
              </Typography>

              <Button
                sx={{ mt: 2 }}
                variant="contained"
                onClick={() =>
                  navigate(
                    `/student/dashboard/courses/${courseId}/topics/${topic._id}`
                  )
                }
              >
                Watch Topic
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default CourseDetails;