const express = require("express");

const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    publishCourse,
} = require("../controllers/courseController");

const router = express.Router();

router.post("/", createCourse);          // Create
router.get("/", getAllCourses);          // Read All
router.get("/:id", getCourseById);       // Read One
router.put("/:id", updateCourse);        // Update
router.delete("/:id", deleteCourse);     // Delete
router.patch("/:id/publish", publishCourse); // Publish / Unpublish

module.exports = router;