
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const cookieParser = require("cookie-parser");

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
app.use(express.json());
app.use(cookieParser());



// Routes
app.use("/api/auth",require("./routes/authRoutes"));


app.get("/", (req, res) => {
    res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});