const Course = require("../models/Course");
const Topic = require("../models/Topic");

// Get all published courses
const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      isPublished: true,
    })
      .populate("trainer", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get topics of a course
const getCourseTopics = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({
      _id: courseId,
      isPublished: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const topics = await Topic.find({
      course: courseId,
    }).sort({ order: 1 });

    return res.status(200).json({
      success: true,
      count: topics.length,
      topics,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPublishedCourses,
  getCourseTopics,
};