const express=require("express")

let bodyParser = require('body-parser')
const Register =require("../models/register")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
route=express.Router();
const cors = require("cors")
route.use(cors({
    origin: "*",
}))

route.use(express.json())
route.use(bodyParser.json())
route.use(bodyParser.urlencoded())

route.post('/register', async (req, res) => {
    try {
        console.log("its coming")
        console.log(req.body)
        const { email, password, confirmpassword } = req.body;
        
        let userData = await Register.findOne({ email :email });
        if (userData) {
            return res.status(409).json({
                status: "Failed",
                message: "User already exists with the given email"
            })
        }
        console.log(password,confirmpassword)
        if (password !== confirmpassword) {
            return res.status(400).send('Passwords are not matching');
        }

        bcrypt.hash(password, 10, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                })
            }
            userData = await Register.create({
                email: email,
                password: hash
            });
            res.json({
                status: "ok",
               
                
            })
        })
    }
    catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }
});
module.exports= route;

 