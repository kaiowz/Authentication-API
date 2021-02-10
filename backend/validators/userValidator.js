const {checkSchema, check} = require("express-validator");
const {cpf} = require("cpf-cnpj-validator");

module.exports = {
    signup: checkSchema({
        email:{
            isEmail: true,
            notEmpty: true,
            errorMessage: "Invalid e-mail!"
        },
        cpf:{
            custom:{
                options: (value)=>{
                    return cpf.isValid(value);
                }
            },
            notEmpty: true,
            errorMessage: "Invalid cpf!"
        },
        phone:{
            custom: {
                options: (value)=>{
                    let phoneRe = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
                    let digits = value.replace(/\D/g, "");
                    return phoneRe.test(digits);
                }
            },
            notEmpty: true,
            errorMessage: "Invalid phone!"
        },
        pass:{
            notEmpty: true,
            options: {
                min: 6
            },
            errorMessage: "Invalid password!"
        }
    }),
    edit: checkSchema({
        email:{
            optional: true,
            isEmail: true,
            notEmpty: true,
            errorMessage: "Invalid e-mail!"
        },
        cpf:{
            optional: true,
            custom:{
                options: (value)=>{
                    return cpf.isValid(value);
                }
            },
            notEmpty: true,
            errorMessage: "Invalid cpf!"
        },
        phone:{
            optional: true,
            custom: {
                options: (value)=>{
                    let phoneRe = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
                    let digits = value.replace(/\D/g, "");
                    return phoneRe.test(digits);
                }
            },
            notEmpty: true,
            errorMessage: "Invalid phone!"
        },
        pass:{
            optional: true,
            notEmpty: true,
            options: {
                min: 6
            },
            errorMessage: "Invalid password!"
        }
    })
}