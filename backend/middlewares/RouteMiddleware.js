const Question = require("../models/QuestionModel");

module.exports.isQuestionId = async (req, res, next) => {
  try {
    const questionId = req.params;
    let question = await Question.findById({ questionId });
    if (!questionId) {
      return res.json({ message: "cannot fetch question id" });
    }
  } catch (err) {
    console.log(err);
    return res.json({ message: "error happened" });
  }
  next();
};
