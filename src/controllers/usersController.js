const User = require('../database/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')

const SECRET = process.env.SECRET

module.exports = {
    register: async (req,res)=>{

        const errors = validationResult(req)

        if(errors.isEmpty()){

            const {email, password} = req.body;
    
            const user = new User({
                email,
                password: bcrypt.hashSync(password,10)
            })
    
            await user.save()
                    .then(user=>{
                        res.status(201).json({
                            msg: 'Usuario registrado'
                        })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            msg: 'Usuario no creado'
                        })
                    })
        } else {
            res.json({
                errors:errors.mapped()
            })
        }

    },
    login: async (req, res)=>{
        const {email,password} = req.body;

        const errors = validationResult(req);

        if(errors.isEmpty()){

            let user = await User.findOne({email: email})
    
            if(user !== null){
    
                let token = jwt.sign({
                    email:user.email
                }, SECRET,{
                    expiresIn:"2h"
                })
    
                res.status(200).json({
                    user,
                    token
                })
            } else {
                res.status(500).json({
                    msg: 'El usuario no Existe'
                })
            }
        } else {
            res.json({
                errors:errors.mapped()
            })
        }

    }
}