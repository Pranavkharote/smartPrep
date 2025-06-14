const mongoose = require("mongoose");
const Question = require("./models/QuestionModel"); // Adjust path if needed

// ✅ Change to your actual MongoDB URI if it's not local
mongoose.connect("mongodb+srv://pranavkharote2005:yIu2UqnJOVU8qzJO@cluster0.bnd1w.mongodb.net/SmartPrep?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const toCamelCase = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

async function updateFunctionNames() {
  try {
    const questions = await Question.find();

    for (const q of questions) {
      const camelName = toCamelCase(q.title);
      q.functionName = camelName;
      await q.save();
      console.log(`✅ Updated "${q.title}" → functionName: "${camelName}"`);
    }

    console.log("✅ All questions updated.");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error updating questions:", err);
    mongoose.disconnect();
  }
}

updateFunctionNames();
