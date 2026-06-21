const express = require("express");
const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require("../controllers/courseController");
const router = express.Router();



// Create Course
router.post("/", createCourse);

// Get All Courses
router.get("/", getAllCourses);

// Get Single Course
router.get("/:id", getCourseById);

// Update Course
router.put("/:id", updateCourse);

// Delete Course
router.delete("/:id", deleteCourse);

module.exports = router;