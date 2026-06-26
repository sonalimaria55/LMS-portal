const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const User = require("../models/User");

// upload profile pic
router.put(
  "/upload-profile",
  auth,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      user.profilePic = req.file.path; // saves: uploads/filename.jpg

      await user.save();

      res.json({
        success: true,
        profilePic: user.profilePic,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;