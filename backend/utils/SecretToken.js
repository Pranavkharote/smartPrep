const jwt = require("jsonwebtoken");
require("dotenv").config();

const createSecretToken = (user) => {
  return jwt.sign( { id: user._id, username: user.name }, process.env.JWT_TOKEN, {
    expiresIn: 7 * 24 * 60 * 60,
  });
};

module.exports = createSecretToken;
