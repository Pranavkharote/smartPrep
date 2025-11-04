const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
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

    if (auth) {
      let token = crypto.randomBytes(20).toString("hex");

      user.token = token;
      await user.save();
      return res
        .status(200)
        .json({ token: token, message: "LoggedIn Successfully" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("🔥 Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = { Login, Signup };
