const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    // Extract token from cookies or Authorization header
    const token =
      req.cookies?.token || req.header("Authorization")?.split(" ")[1];

    console.log("Extracted Token:", token);

    if (!token) {
      return res.status(401).json({
        message: "Please Login",
        error: true,
        success: false,
      });
    }

    // Verify token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("JWT Verification Error:", err);
        return res.status(401).json({
          message: "Invalid or Expired Token",
          error: true,
          success: false,
        });
      }

      console.log("Decoded Token:", decoded);

      req.userid = decoded?._id; // Attach user ID to request
      next(); // Proceed to next middleware
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;