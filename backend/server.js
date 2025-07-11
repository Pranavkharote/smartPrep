const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const AuthRoutes = require("./routes/AuthRoutes");
const SubmissionRoutes = require("./routes/SubmissionRoutes");
const Gemini = require("./routes/Gemini")

const app = express();
dotenv.config();

const allowedOrigins = [
  'http://localhost:5173', // ✅ Dev
  'https://smart-prep-azure.vercel.app', // ✅ Your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/", AuthRoutes);
app.use("/", SubmissionRoutes);
app.use("/", Gemini);

app.get("/", (req, res) => {
  res.send("Server is listening on 8080");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
