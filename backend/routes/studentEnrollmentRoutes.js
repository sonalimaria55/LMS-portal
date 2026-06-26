const express = require("express");
const router = express.Router();

const {
  enrollCourse,
  getMyLearning,
  checkEnrollment,
} = require("../controllers/studentEnrollmentController");


const isStudent = require("../middleware/isStudent");

// Enroll in a course
router.post(
  "/enroll/:courseId",

  isStudent,
  enrollCourse
);

// Get enrolled courses
router.get(
  "/my-learning",
  
  isStudent,
  getMyLearning
);

// Check enrollment status
router.get(
  "/check/:courseId",

  isStudent,
  checkEnrollment
);

module.exports = router;