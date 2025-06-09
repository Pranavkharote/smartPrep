const { UserModel } = require("../models/UserModel");
const createSecretToken = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (!name || !email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }
    if (existingUser) {
      return res.status(401).json({ message: "User Already exist" });
    }
    const user = await UserModel.create({ email, name, password });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });
    res
      .status(201)
      .json({ message: "User Registered Successfully!", success: true });
  } catch (error) {
    console.error(error);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("email:", email, "pass:", password);
    if (!email || !password) {
      return res.status(401).json({ message: "All fields are required." });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });
    
    res.status(201).json({ message: "LoggedIn successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { Login, Signup };
