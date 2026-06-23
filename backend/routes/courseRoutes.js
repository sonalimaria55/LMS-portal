const express = require("express");

const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    publishCourse,
} = require("../controllers/courseController");
const isTrainer = require("../middleware/isTrainer");

const router = express.Router();

router.post("/", isTrainer,createCourse);          // Create
router.get("/", getAllCourses);          // Read All
router.get("/:id", getCourseById);       // Read One
router.put("/:id", updateCourse);        // Update
router.delete("/:id", isTrainer,deleteCourse);     // Delete
router.patch("/:id/publish",isTrainer, publishCourse); // Publish / Unpublish

module.exports = router;