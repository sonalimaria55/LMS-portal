const jwt = require("jsonwebtoken");

const isTrainer = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    console.log("DECODED USER:", decoded);

    if (decoded.role !== "trainer") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Trainer only.",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.log("TRAINER AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = isTrainer;