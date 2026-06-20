const User = require("../models/User");
const sendEmail = require("../config/mail");
const Otp = require("../models/OtpModel");

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        // Check if already registered
        const existingUser = await User.findOne({
            email,
        });

     

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already verified",
            });
        }

        // Generate OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // Remove old OTP
        await Otp.deleteMany({ email });

        // Save OTP
        console.log("--------------------");

        const savedOtp = await Otp.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        
        // Send Email
        await sendEmail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const verifyOtpController = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpVerify = await Otp.findOne({
            email,
            otp,
        });

        if (!otpVerify) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        if (otpVerify.expiresAt < new Date()) {
            await Otp.deleteOne({
                _id: otpVerify._id,
            });

            return res.status(400).json({
                success: false,
                message: "OTP expired",
            });
        }

        const existingUser = await User.findOne({
            email,
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already verified ",
            });
        }

        await User.create({
            email,
        });

        await Otp.deleteOne({
            _id: otpVerify._id,
        });

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    sendOtp,
    verifyOtpController,
};


// const User = require("../models/User");
// const sendEmail = require("../config/mail");
// const Otp = require("../models/OtpModel");


// const sendOtp = async (req, res) => {
//     try {
//         const { email } = req.body;

//         if (!email) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email is required",
//             });
//         }

//         // Check if user already exists
//         console.log("Creating user for:", email);

//         const newUser = await User.create({
//             email,
//         });

//         console.log("User created:", newUser);

//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email already registered",
//             });
//         }

//         // Generate OTP
//         const otp = Math.floor(
//             100000 + Math.random() * 900000
//         ).toString();



//         // Remove old OTP
//         await Otp.deleteMany({ email });

//         // Save new OTP
//         await Otp.create({
//             email,
//             otp,
//             expiresAt: new Date(
//                 Date.now() + 5 * 60 * 1000
//             ),
//         });

//         // Send Email
//         await sendEmail(email, otp);

//         res.status(200).json({
//             success: true,
//             message: "OTP sent successfully",
//         });
//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             success: false,
//             message: "Server Error",
//         });
//     }
// };


// const verifyOtpController = async (req, res) => {
//     try {
//         const { email, otp } = req.body;

//         // Validate OTP here
//         let otpVerify = await Otp.findOne({ email, otp });
//         if (!otpVerify) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid OTP",
//             });
//         }
//         // console.log(otpVerify);

//         if (otpVerify.expiresAt < new Date()) {
//             await Otp.deleteOne({
//                 _id: otpVerify._id,
//             });

//             return res.status(400).json({
//                 success: false,
//                 message: "OTP expired",
//             });
//         }
//         const existingUser = await User.findOne({
//             email
//         });

//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email already verified",
//             });
//         }



//         await Otp.deleteOne({
//             _id: otpVerify._id,
//         });

//         return res.status(200).json({
//             success: true,
//             message: "Email verified successfully",
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Server Error",
//         });
//     }
// };

// module.exports = {
//     sendOtp,
//     verifyOtpController
// };