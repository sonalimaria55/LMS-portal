
const express = require("express");
const router = express.Router();

const {getPublishedCourses,getCourseTopics,} = require("../controllers/studentController");

router.get("/", getPublishedCourses);

router.get("/:courseId/topics",getCourseTopics);

module.exports = router;