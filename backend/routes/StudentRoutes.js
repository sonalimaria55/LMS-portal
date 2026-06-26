
const express = require("express");
const router = express.Router();

const {getPublishedCourses,getCourseTopics,getTopicById} = require("../controllers/studentController");

router.get("/", getPublishedCourses);

router.get("/:courseId/topics",getCourseTopics);
router.get("/topics/:topicId", getTopicById);

module.exports = router;