const router = require("express").Router();

const UsersController = require("./controllers/usersController");
const userValidator = require("./validators/userValidator");
const UsersValidator = require("./validators/userValidator");

router.post("/api/signup", UsersValidator.signup, UsersController.singup);
router.post("/api/signin", UsersController.signin);


module.exports = router;