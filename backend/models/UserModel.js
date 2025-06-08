const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel, UserSchema };
