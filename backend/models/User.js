const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default:""
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            default:""
        },
        isRegistered:{
            type:Boolean,
            default:false
        },
        role: {
            type: String,
            enum: ["student", "admin", "trainer"],
            default: "student",
        },
        isActive:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);