
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

const isAdmin=require("./middleware/isAdmin");
const isTrainer=require("./middleware/isTrainer");
const isStudent=require("./middleware/isStudent");
const userRoutes = require("./routes/userRoutes");


const path = require("path");

const app = express();

// DB connect
connectDB();

// Middlewares
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,

    })
);
app.use(cookieParser());
app.use(express.json());




// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/otp", require("./routes/OtpRoutes"));


app.use("/api/admin",isAdmin,require("./routes/AdminRoutes"));

app.use("/api/trainer/courses",isTrainer,require("./routes/courseRoutes"));

app.use ("/api/trainer/topics",require("./routes/topicRoutes"))//isTrainer


app.use ("/api/student/courses",isStudent,require("./routes/studentRoutes"))

app.use("/api/student",isStudent,require("./routes/studentEnrollmentRoutes"));




app.use("/api/user", userRoutes);


app.use("/uploads",
    express.static(path.join(__dirname,"uploads"))
);




app.get("/", (req, res) => {
    res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});