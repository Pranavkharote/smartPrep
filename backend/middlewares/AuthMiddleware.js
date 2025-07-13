const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;


    if (!token) {
      return res.status(401).json({ status: false, message: "Token not found" });
    }

    jwt.verify(token, process.env.JWT_TOKEN, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: false, message: "Invalid token" });
      }

      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ status: false, message: "User not found" });
      }

      req.user = user; // You can access user details in your route via req.user
      next();
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = authenticateUser;
