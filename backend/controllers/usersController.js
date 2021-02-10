const UsersModel = require("../models/usersModel");
const {matchedData, validationResult} = require("express-validator")

module.exports = new class UsersController{
    async singin(req, res){
        let json = {error: [], result: []};
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            json.error.push(errors.mapped());
            return res.json(json);
        }
        const data = matchedData(req);
        console.log(data);
    }

    async signup(req, res){

    }

    async info(req, res){

    }
}