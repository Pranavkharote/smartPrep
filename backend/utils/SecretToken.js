const jwt = require("jsonwebtoken");
require("dotenv").config();

const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

module.exports = createSecretToken;
