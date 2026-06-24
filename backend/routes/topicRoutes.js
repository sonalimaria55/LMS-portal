const express = require("express");

const {
  createTopic,
  getTopicsByCourse,
  getTopicById,
  updateTopic,
  deleteTopic,
} = require("../controllers/topicController");





const router = express.Router();





// Create Topic
router.post("/",  createTopic);

// Get Topics by Course
router.get("/courses/:courseId",  getTopicsByCourse);

// Get Single Topic
router.get("/:id", getTopicById);

// Update Topic
router.put("/:id",  updateTopic);

// Delete Topic
router.delete("/:id", deleteTopic);

module.exports = router;