const UsersModel = require("../models/usersModel");
const jwt = require("jsonwebtoken");

module.exports = {
    private: async(req, res, next)=>{
        if (!req.query.token && !req.body.token){
            res.json({notallowed: true});
            return;
        }

        let token = "";
        if (req.query.token) {token = req.query.token};
        if (req.body.token) {token = req.body.token};

        if (token == ""){
            res.json({notallowed: true});
            return;
        }

        jwt.verify(token, process.env.JWT_KEY, function(err, decoded){
            if (err){
                res.json({notallowed: true});
                return;
            }
            next();
        })        
    }
}