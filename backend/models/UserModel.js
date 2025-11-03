const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Your Email is required"],
  },
  password: {
    type: String,
    required: [true, "Your Password is required"],
  },
  token: {
    type: String
  }
});


const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel, UserSchema };
