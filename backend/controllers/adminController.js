const User = require("../models/User");
const bcrypt = require("bcrypt");

// Add Trainer
const addTrainer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingTrainer = await User.findOne({
      email,
    });

    if (existingTrainer) {
      return res.status(400).json({
        success: false,
        message: "Trainer already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const trainer = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "trainer",
      isRegistered: true,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "Trainer added successfully",
      trainer,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Trainers
const getAllTrainers = async (req, res) => {
  try {
    const trainers = await User.find({
      role: "trainer",
    }).select("-password");

    res.status(200).json({
      success: true,
      trainers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Trainer By Id
const getTrainerById = async (req, res) => {
  try {
    const trainer = await User.findOne({
      _id: req.params.id,
      role: "trainer",
    }).select("-password");

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      success: true,
      trainer,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Trainer
const updateTrainer = async (req, res) => {
  try {
    const { name, email } = req.body;

    const trainer =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          name,
          email,
        },
        {
          new: true,
        }
      ).select("-password");

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trainer updated successfully",
      trainer,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Trainer
const deleteTrainer = async (req, res) => {
  try {
    const trainer =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trainer deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const updateTrainerStatus = async (req, res) => {
  try {
    const trainer = await User.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    trainer.isActive = !trainer.isActive;

    await trainer.save();

    res.status(200).json({
      success: true,
      message: "Trainer status updated",
      isActive: trainer.isActive,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
  updateTrainerStatus,
};