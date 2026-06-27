import {
  Box,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/API";

function StudentCourseDetails() {
  const { courseId } = useParams();

  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FIXED: Safe Google Drive embed converter
  const getDriveEmbedUrl = (url) => {
    if (!url) return "";

    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);

    if (!match || !match[1]) return "";

    const fileId = match[1];

    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  // Fetch topics
  const fetchTopics = async () => {
    try {
      const res = await API.get(
        `/student/courses/${courseId}/topics`
      );

      const topicList = res.data.topics || [];

      setTopics(topicList);

      if (topicList.length > 0) {
        setSelectedTopic(topicList[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [courseId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // ✅ Pre-calculate embed URL (important improvement)
  // const embedUrl = selectedTopic
  //   ? getDriveEmbedUrl(selectedTopic.videoUrl)
  //   : "";



  const embedUrl = selectedTopic
    ? getDriveEmbedUrl(selectedTopic.videoUrl)
    : "";

  ;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        height: "calc(100vh - 80px)",
      }}
    >
      {/* LEFT PANEL */}
      <Paper
        elevation={3}
        sx={{
          width: "30%",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            p: 2,
            borderBottom: "1px solid #ddd",
            fontWeight: "bold",
          }}
        >
          Course Topics
        </Typography>

        <List>
          {topics.map((topic) => (
            <ListItemButton
              key={topic._id}
              selected={selectedTopic?._id === topic._id}
              onClick={() => setSelectedTopic(topic)}
            >
              <ListItemText
                primary={`${topic.order}. ${topic.topicName}`}
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* RIGHT PANEL */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          p: 3,
          overflowY: "auto",
        }}
      >
        {!selectedTopic ? (
          <Typography>No topics available.</Typography>
        ) : (
          <>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {selectedTopic.topicName}
            </Typography>

            <Typography color="text.secondary" mb={3}>
              {selectedTopic.description}
            </Typography>

            {/* VIDEO SECTION */}
            {embedUrl ? (
              <iframe
                title={selectedTopic.topicName}
                width="100%"
                height="500"
                src={embedUrl}
                allow="autoplay"
                allowFullScreen
                style={{
                  border: 0,
                  borderRadius: 10,
                }}
              />
            ) : (
              <Typography color="error">
                Invalid Google Drive file link.
              </Typography>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
}

export default StudentCourseDetails;