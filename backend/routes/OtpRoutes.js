const express = require("express");
const router = express.Router();

const {
  sendOtp,
  verifyOtpController,
} = require("../controllers/OtpController");

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtpController);

module.exports = router;