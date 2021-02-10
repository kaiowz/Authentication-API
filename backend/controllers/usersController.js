const UsersModel = require("../models/usersModel");
const {matchedData, validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = new class UsersController{
    async singup(req, res){
        let json = {error: [], result: []};
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            json.error.push(errors.mapped());
            return res.json(json);
        }
        const data = matchedData(req);
        //JWT Token with 3 hours of expiration
        const userToken = {
            email: data.email,
            cpf: data.cpf,
            phone: data.phone,
        } 
        let token = jwt.sign({userToken, iat: Math.floor(Date.now() / 1000) - 10800}, process.env.JWT_KEY);
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

    async signin(req, res){
        let json = {error:[], result:[]};
        const data = req.body;

        (!data.login) ? json.error.push({"msg": "You need to insert a user."}) : json.error = json.error;
        (!data.pass) ? json.error.push({"msg": "You need to insert a password."}) : json.error = json.error;

        if (json.error.length > 0){
            return res.json(json);
        }

        await UsersModel.findOne({
            $or:[
                {cpf: data.login},
                {email: data.login},
                {phone: data.login},
            ]
        }).then(async (user) =>{
            if (user){
                let match = await bcrypt.compare(data.pass, user.pass);
                if (match){
                    const userToken = {
                        email: user.email,
                        cpf: user.cpf,
                        phone: user.phone
                    } 
                    user.token = jwt.sign({userToken, iat: Math.floor(Date.now() / 1000) - 10800}, process.env.JWT_KEY);
                    user.save();
                    json.result.push({"msg":"User logged with success"}, {token: user.token});
                }else{
                    json.error.push({"msg": "Invalid User and/or Password"});
                }
            }else{
                json.error.push({"msg": "Invalid User and/or Password"});
            }
        }).catch((err) =>{
            console.log(err);
            json.error.push(err.message);
        })
        res.json(json);
    }

    async update(req, res){
        let json = {error: [], result: []};
        let {_id} = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            json.error.push(errors.mapped());
            return res.json(json);
        }
        const data = matchedData(req);
        if (data.pass){
            data.pass = await bcrypt.hash(data.pass, 10);
        }
        await UsersModel.findByIdAndUpdate({_id}, data).then((user)=>{
            if (user){
                let userToken = {
                    email: user.email,
                    phone: user.phone,
                    cpf: user.cpf
                }
                user.token = jwt.sign({userToken, iat: Math.floor(Date.now() / 1000) - 10800}, process.env.JWT_KEY);
                user.save()
                json.result.push({"msg": `${user._id} updated with success`}, {token:user.token})
            }else{
                json.error.push({"msg": "User not found"});
            }
        }).catch((err)=>{
            json.error.push(err.message);
        })

        res.json(json);
    }

    async delete(req, res){
        let json = {error: [], result:[]};
        let {_id} = req.params;
        await UsersModel.findOneAndDelete(_id).then((user)=>{
            json.result.push({"msg": `${user.id} deleted with success`});
        }).catch((err)=>{
            json.error.push(err.message);
        });
        res.json(json);
    }

    async profile(req, res){
        let json = {error: [], result:[]};
        let {token} = req.body;
        await UsersModel.findOne({token: token}).then((user)=>{
            if (user){
                json.result.push(user);
            }else{
                json.error.push({"msg":"User not found"});
            }
        }).catch((err)=>{
            json.error.push(err.message);
        });
        res.json(json);
    }
}