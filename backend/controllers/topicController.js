const Topic = require("../models/Topic");
const Course = require("../models/Course");

// Create Topic


const createTopic = async (req, res) => {
    try {
        const { topicName, description, videoUrl, course } = req.body;

        console.log(req.body);

        const count = await Topic.countDocuments({ course });

        // 👇 ADD HERE
        console.log("REQ USER =", req.user);
        const topic = await Topic.create({
            trainer: req.user.id,
            topicName,
            description,
            videoUrl,
            course,
            order: count + 1,
        });


        res.status(201).json({
            message: "Topic created successfully",
            topic,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get Topics By Course
const getTopicsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const topics = await Topic.find({
            course: courseId,
        }).sort({ order: 1 });

        res.status(200).json({
            success: true,
            data: topics,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Single Topic
const getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id);

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: "Topic not found",
            });
        }

        res.status(200).json({
            success: true,
            data: topic,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Topic
const updateTopic = async (req, res) => {
    try {
        const topic = await Topic.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: "Topic not found",
            });
        }

        res.status(200).json({
            success: true,
            data: topic,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Topic
const deleteTopic = async (req, res) => {
    try {
        const topic = await Topic.findByIdAndDelete(
            req.params.id
        );

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: "Topic not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Topic deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createTopic,
    getTopicsByCourse,
    getTopicById,
    updateTopic,
    deleteTopic,
};