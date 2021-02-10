const router = require("express").Router();

const UsersController = require("./controllers/usersController");
const userValidator = require("./validators/userValidator");
const UsersValidator = require("./validators/userValidator");
const Auth = require("./middlewares/authMiddleware");

router.post("/api/signup", UsersValidator.signup, UsersController.singup);
router.post("/api/signin", UsersController.signin);
router.get("/api/user", Auth.private, UsersController.profile);


module.exports = router;