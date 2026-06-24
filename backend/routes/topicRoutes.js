const express = require("express");

const {
  createTopic,
  getTopicsByCourse,
  getTopicById,
  updateTopic,
  deleteTopic,
} = require("../controllers/topicController");

const isTrainer = require("../middleware/isTrainer");

const router = express.Router();
// Create Topic
router.post("/", isTrainer, createTopic);

// Get Topics by Course
router.get("/courses/:courseId",isTrainer,  getTopicsByCourse);

// Get Single Topic
router.get("/:id",isTrainer, getTopicById);

// Update Topic
router.put("/:id",isTrainer,  updateTopic);

// Delete Topic
router.delete("/:id",isTrainer, deleteTopic);

module.exports = router;