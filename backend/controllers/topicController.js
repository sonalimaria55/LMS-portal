const Topic = require("../models/Topic");
const Course = require("../models/Course");

// CREATE TOPIC
const createTopic = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("USER:", req.user);

        const {
            topicName,
            description,
            videoUrl,
            course,
        } = req.body;

        // Verify course belongs to trainer
        const existingCourse =
            await Course.findOne({
                _id: course,
                trainer: req.user.id,
            });

        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                message:
                    "Course not found or access denied",
            });
        }

        // Auto calculate order
        const lastTopic =
            await Topic.findOne({
                course,
            }).sort({ order: -1 });

        const nextOrder = lastTopic
            ? lastTopic.order + 1
            : 1;

        const topic = await Topic.create({
            trainer: req.user.id,
            course,
            topicName,
            description,
            videoUrl,
            order: nextOrder,
        });

        return res.status(201).json({
            success: true,
            message:
                "Topic created successfully",
            topic,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL TOPICS OF A COURSE
const getTopicsByCourse = async (
    req,
    res
) => {
    try {
        const { courseId } = req.params;

        // Verify trainer owns course
        const course =
            await Course.findOne({
                _id: courseId,
                trainer: req.user.id,
            });

        if (!course) {
            return res.status(404).json({
                success: false,
                message:
                    "Course not found or access denied",
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

// GET SINGLE TOPIC
const getTopicById = async (
    req,
    res
) => {
    try {
        const topic =
            await Topic.findOne({
                _id: req.params.id,
                trainer: req.user.id,
            });

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: "Topic not found",
            });
        }

        return res.status(200).json({
            success: true,
            topic,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE TOPIC
const updateTopic = async (
    req,
    res
) => {
    try {
        const {
            topicName,
            description,
            videoUrl,
            order,
        } = req.body;

        const topic =
            await Topic.findOneAndUpdate(
                {
                    _id: req.params.id,
                    trainer: req.user.id,
                },
                {
                    topicName,
                    description,
                    videoUrl,
                    order,
                },
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

        return res.status(200).json({
            success: true,
            message:
                "Topic updated successfully",
            topic,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE TOPIC
const deleteTopic = async (
    req,
    res
) => {
    try {
        const topic =
            await Topic.findOneAndDelete({
                _id: req.params.id,
                trainer: req.user.id,
            });

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: "Topic not found",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Topic deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
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