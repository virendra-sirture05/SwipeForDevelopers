const express = require('express');
const authRouter = express.Router();

const { validateSignupData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const getJWT = require('../models/user');
const { now } = require('mongoose');

authRouter.post('/signup',async(req,res)=>{
    try {
        // validation of data
        validateSignupData(req);

        const {firstName, lastName, email, password,About, photoUrl} = req.body;

        // encrypt the password
        const passwordHash = await bcrypt.hash(password,10);

        const user = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
            photoUrl,
            About
        })

        // await user.save();
        // res.send('user added successfully');

        const savedUser = await user.save();
        const token = await savedUser.getJWT();
        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000),
        });
         res.json({ message: "User Added successfully!", data: savedUser });
        
    } catch (error) {
        res.status(400).send("Error: "+ error.message);
    }
})

authRouter.post('/login',async(req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email : email});
        if(!user){
            throw new Error("Invalid Credentials");
        }
       
        const isPassword = await user.validatePassword(password);
        
        if(isPassword){
            const token = await user.getJWT();
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            });
            // res.send("login succuessfully");
            res.send(user)
        }
        else throw new Error("Invalid");

    } catch (error) {
        res.status(400).send('Error : '+error.message)
    }
})

authRouter.post('/logout',(req,res)=>{
    res.cookie("token",null,{
        expires : new Date(Date.now())
    })
    res.send("logout successfully");
})

module.exports = authRouter;