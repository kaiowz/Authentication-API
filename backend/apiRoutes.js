const router = require("express").Router();

const UsersController = require("./controllers/usersController");
const UsersValidator = require("./validators/userValidator");

router.get("/ping", (req,res)=>{
    res.json({pong: true});
})

router.post("/api/signin", UsersValidator.new, UsersController.singin);


module.exports = router;