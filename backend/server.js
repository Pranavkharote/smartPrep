const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const AuthRoutes = require("./routes/AuthRoutes");
const SubmissionRoutes = require("./routes/SubmissionRoutes");


const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/", AuthRoutes);
app.use("/", SubmissionRoutes);

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
