const express = require("express");

const {
    addTrainer,
    getAllTrainers,
    getTrainerById,
    updateTrainer,
    deleteTrainer,
    updateTrainerStatus,
} = require("../controllers/adminController");


const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.post("/trainers", addTrainer);

router.get("/trainers",getAllTrainers);

router.get("/trainers/:id",getTrainerById);

router.put("/trainers/:id",updateTrainer);

router.delete("/trainers/:id",deleteTrainer);

router.patch("/trainers/:id/status",updateTrainerStatus);

module.exports = router;