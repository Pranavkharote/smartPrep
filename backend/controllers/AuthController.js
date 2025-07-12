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
      .json({
        message: "User Registered Successfully!",
        success: true,
        name: name,
      });
  } catch (error) {
    console.error(error);
  }
};

// const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // console.log("email:", email, "pass:", password);
//     if (!email || !password) {
//       return res.status(401).json({ message: "All fields are required." });
//     }
//     const user = await UserModel.findOne({ email });
//     console.log(user);
//     if (!user) {
//       return res.status(401).json({ message: "Incorrect email or password" });
//     }
//     const auth = await bcrypt.compare(password, user.password);
//     if (!auth) {
//       return res.status(401).json({ message: "Incorrect email or password" });
//     }
//     const token = createSecretToken(user._id);
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // use secure cookies in production
//       sameSite: "Lax", // or "None" if using cross-site cookies with HTTPS
//       maxAge: 7 * 24 * 60 * 60 * 1000, // optional: 7 days
//     });

//     // const username = await UserModel.fin/dOne({})
//     // console.log("username :", username)

//     res
//       .status(201)
//       .json({ message: "LoggedIn successfully", success: true, token: token });
//   } catch (error) {
//     console.log(error);
//   }
// };

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Login request received with:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None", // ← this is important for frontend <-> backend cookie with different domains
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("✅ Login successful for user:", user.email);

    return res.status(200).json({
      message: "Logged in successfully",
      success: true,
      token,
    });
  } catch (error) {
    console.error("🔥 Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};


module.exports = { Login, Signup };
