const { Login, Signup } = require("../controllers/AuthController");
const {Router} = require("express")
const router = Router();
const authenticateUser = require("../middlewares/AuthMiddleware")

router.route("/login").post(Login);
router.route("/signup").post(Signup);
router.get("/me", authenticateUser, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
