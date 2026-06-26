const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// ==============================
// Enroll in a Course
// ==============================
const enrollCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.params;

    // Check if course exists
    const course = await Course.findById(courseId);

    if (!course || !course.isPublished) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if already enrolled
    const alreadyEnrolled = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled in this course",
      });
    }

    // Create enrollment
    await Enrollment.create({
      student: studentId,
      course: courseId,
    });

    return res.status(201).json({
      success: true,
      message: "Course enrolled successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// My Learning
// ==============================
const getMyLearning = async (req, res) => {
  try {
    const studentId = req.user.id;

    const enrollments = await Enrollment.find({
      student: studentId,
    }).populate({
      path: "course",
      populate: {
        path: "trainer",
        select: "name email",
      },
    });

    const courses = enrollments
      .map((e) => e.course)
      .filter(Boolean);

    return res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Check Enrollment
// ==============================
const checkEnrollment = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.params;

    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    return res.status(200).json({
      success: true,
      enrolled: !!enrollment,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  enrollCourse,
  getMyLearning,
  checkEnrollment,
};