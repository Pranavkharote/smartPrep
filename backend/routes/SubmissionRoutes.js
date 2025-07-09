const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/AuthMiddleware");
const UserProgress = require("../models/UserProgressModel");
const Question = require("../models/QuestionModel");
const { isQuestionId } = require("../middlewares/RouteMiddleware");
const jwt_decode = require("jwt-decode");

router.post("/newquestion", async (req, res) => {
  console.log(req.body);
  const newQuestion = new Question(req.body);
  await newQuestion.save();
  res.status(201).json({ message: "Question Added" });
});

router.post("/submit", authenticateUser, async (req, res) => {
  const { questionId, status, timeTaken, submittedAt } = req.body;
  const newProgress = new UserProgress({
    userId: req.user._id,
    questionId,
    status,
    timeTaken,
    submittedAt: Date.now(),
  });

  await newProgress.save();

  res.status(201).json(newProgress);
});

router.post("/submission", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      questionId,
      status,
      submittedCode,
      languageId,
      startedAt,
    } = req.body;

    const timeTaken = submittedAt - startedAt;
    const submittedAt = Date.now();

    const newSubmission = new UserProgress({
      userId,
      questionId,
      languageId,
      timeTaken,
      submittedCode,
      status,
      submittedAt,
    });
    await newSubmission.save();
    return res.json({
      message: "submission created",
      submission: newSubmission,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Submission failed", success: false });
  }
});

router.get("/submission/:questionId", authenticateUser, async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const userSubmission = await UserProgress.find({ questionId });
    if (!userSubmission) {
      return res.json({ message: "submission not found" }).status(404);
    }
    res.json(userSubmission);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Something went wrong" });
  }
});

router.get("/submission", authenticateUser, async (req, res) => {
  try {
    // console.log(req.user);
    const userId = req.user._id;
    const rawData = await UserProgress.find({ userId })
      .populate("questionId", "title difficulty")
      .select("status timeTaken submittedAt questionId")
      .sort({ submittedAt: -1 });

    const formattedData = rawData.map(
      ({ status, timeTaken, submittedAt, questionId }) => ({
        status,
        timeTaken,
        submittedAt,
        question: {
          _id: questionId._id,
          title: questionId.title,
          difficulty: questionId.difficulty,
        },
      })
    );
    res.json(formattedData);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/questions", async (req, res) => {
  try {
    const allQuestion = await Question.find({});
    return res.json(allQuestion);
  } catch (error) {
    console.log(error);
    return res.status(404).json("something error in question");
  }
});
router.get("/questions/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const allQuestion = await Question.findById(questionId);
    return res.json(allQuestion);
  } catch (error) {
    console.log(error);
    return res.status(404).json("something error in question");
  }
});
router.get("/questiondetail", async (req, res) => {
  try {
    const allQuestion = await Question.find({});
    return res.json(allQuestion);
  } catch (error) {
    console.log(error);
    return res.status(404).json("something error in question");
  }
});

router.get("/questions/:questionId", async (req, res) => {
  try {
    let questionId = req.params.questionId;
    // console.log("Question ID:",questionId);
    const questionDetails = await Question.findById(req.params.questionId);
    // console.log(questionDetails)/
    return res.json(questionDetails);
  } catch (error) {
    console.log(error);
    return res
      .json({ message: "something problem in /q/id route" })
      .status(404);
  }
});

router.get("/submission-history", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;

    const submission = await UserProgress.find({ userId })
      .populate("questionId", "title")
      .sort({ createdAt: -1 });

    res.json({ success: true, submission });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Failed to fetch history" });
  }
});

router.get("/submission/:questionId", async (req, res) => {
  let questionId = req.params.questionId;
  let userId = req.user._id;
  // console.log("questionId: ", questionId, "userId: ", userId)
  const submission = await UserProgress.find({ questionId, userId })
    .sort({
      submittedAt: -1,
      createdAt: -1,
    })
    .exec();
  // submission.unshift(newSubmission);
  return res.json(submission);
});

router.get("/user", async (req, res) => {
  let user = req.user;

  return res.json({ message: user });
});

module.exports = router;
