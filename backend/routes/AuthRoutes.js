const { Login, Signup } = require("../controllers/AuthController");
const router = require("express").Router();
const authenticateUser = require("../middlewares/AuthMiddleware");
const Question = require("../models/QuestionModel");
const { UserModel } = require("../models/UserModel");
const UserProgress = require("../models/UserProgressModel");

router.post("/login", Login);
router.post("/signup", Signup);
router.post("/", authenticateUser);

router.get("/", authenticateUser, async (req, res) => {
  return res
    .status(200)
    .json({ status: true, message: "Authenticated", user: req.user });
});

router.get("/user", async (req, res) => {
  const username = await UserModel.find({}).select("name -_id");
  return res.json(username);
});

module.exports = router;
