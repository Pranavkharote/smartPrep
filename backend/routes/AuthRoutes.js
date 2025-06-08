const { Login, Signup } = require("../controllers/authController");
const router = require("express").Router();
const authenticateUser = require("../middlewares/AuthMiddleware");
const Question = require("../models/QuestionModel");
const UserProgress = require("../models/UserProgressModel");

router.post("/login", Login);
router.post("/signup", Signup);
router.post("/", authenticateUser);

router.get("/", authenticateUser, async (req, res) => {
  const question = await Question.find();
  res.json(question);
});


module.exports = router;
