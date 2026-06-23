const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: String,

        trainer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        thumbnail: String,

        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Course",
    courseSchema
);