const { Login, Signup } = require("../controllers/AuthController");
const {Router} = require("express")
const router = Router();

router.route("/login").post(Login);
router.route("/signup").post(Signup);
// router.post("/", authenticateUser);


module.exports = router;
