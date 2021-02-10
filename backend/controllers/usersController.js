const UsersModel = require("../models/usersModel");
const {matchedData, validationResult} = require("express-validator")
const bcrypt = require("bcrypt")

module.exports = new class UsersController{
    async singin(req, res){
        let json = {error: [], result: []};
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            json.error.push(errors.mapped());
            return res.json(json);
        }
        const data = matchedData(req);
        let token = Date.now() + (Math.random() * 100).toFixed();
        token = await bcrypt.hash(token, 10);
        data.pass = await bcrypt.hash(data.pass, 10);
        data.token = token;

        await UsersModel.find({
           $or:[
               {cpf: data.cpf},
               {email: data.email},
               {phone: data.phone},
           ] 
        }).then(async (users)=>{
            if (users.length > 0){
                json.error.push({"msg": "Email, Phone or CPF already registered!"})
            }else{
                await UsersModel.create(data).then((user)=>{
                    json.result.push({msg:`${user._id} created with success`}, {token: user.token});
                }).catch((err)=>{
                    json.error.push(err.message);
                })
            }
        }).catch((err)=>{
            json.error.push(err.message);
        })

        res.json(json);
    }

    async signup(req, res){

    }

    async info(req, res){

    }
}