const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/UserModel");

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log("token is: ", token);
  if (!token) {
    return res.json({ status: false, message: "token not founding" });
  }
  jwt.verify(token, process.env.JWT_TOKEN, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "Invalid token" });
    }
    const user = await UserModel.findById(data.id);
    if (!user) {
      return res.json({ status: false, message: "user  not found" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateUser;
