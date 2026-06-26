// const jwt = require("jsonwebtoken");

// const isStudent = (req, res, next) => {

  
//     try {
//         const authHeader =
//             req.headers.authorization;

//         console.log(
//             "Authorization Header:",
//             authHeader
//         );

//         if (
//             !authHeader ||
//             !authHeader.startsWith("Bearer ")
//         ) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Unauthorized",
//             });
//         }

//         const token =
//             authHeader.split(" ")[1];

//         console.log("Token:", token);

//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_ACCESS_SECRET
//         );

//         console.log(
//             "Decoded Token:",
//             decoded
//         );

//         if (decoded.role !== "student") {
//             return res.status(403).json({
//                 success: false,
//                 message:
//                     "Access denied. student  only.",
//             });
//         }

//         req.user = decoded;

//         console.log(
//             "Trainer Authenticated:",
//             req.user
//         );

//         next();
//     } catch (error) {
//         console.log(
//             "Trainer Middleware Error:",
//             error
//         );

//         return res.status(401).json({
//             success: false,
//             message: "Invalid Token",
//         });
//     }
// };

// module.exports = isStudent;
const jwt = require("jsonwebtoken");

const isStudent = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    console.log("Decoded Token:", decoded);

    if (decoded.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Student only.",
      });
    }

    req.user = decoded;

    console.log("Student Authenticated:", req.user);

    next();
  } catch (error) {
    console.log("Student Middleware Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = isStudent;