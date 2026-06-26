// const express = require("express");

// const {
//     createCourse,
//     getAllCourses,
//     getCourseById,
//     updateCourse,
//     deleteCourse,
//     publishCourse,
//     getPublishedCourses,
// } = require("../controllers/courseController");


// const router = express.Router();

// router.post("/",createCourse);          // Create
// router.get("/", getAllCourses);          // Read All
// router.get("/:id", getCourseById);       // Read One
// router.get("/published", getPublishedCourses);//------------------new f
// router.put("/:id", updateCourse);        // Update
// router.delete("/:id",deleteCourse);     // Delete
// router.patch("/:idpublish", publishCourse); // Publish / Unpublish

// module.exports = router;
const express = require("express");

const {
  createCourse,
  getAllCourses,
  getPublishedCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  publishCourse,
} = require("../controllers/courseController");

const router = express.Router();

router.post("/", createCourse);

router.get("/", getAllCourses);

router.get("/published", getPublishedCourses);

router.get("/:id", getCourseById);

router.put("/:id", updateCourse);

router.delete("/:id", deleteCourse);

router.patch("/:id/publish", publishCourse);

module.exports = router;