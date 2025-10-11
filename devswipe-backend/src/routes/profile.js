const express = require('express');
const { userAuth } = require('../middleware/auth');
const { validateEditProfileData } = require('../utils/validation');
const profileRouter = express.Router();

profileRouter.get('/profile/view', userAuth, async(req,res)=>{
    try {
        console.log('1');
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send("Error: "+error.message);
    }
})

profileRouter.patch('/profile/edit',userAuth,async (req,res)=>{
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit fields");
        }
        const loggedInUser = req.user;
        console.log(loggedInUser);
        Object.keys(req.body).forEach((key)=> (loggedInUser[key] = req.body[key]));
        console.log(loggedInUser);
        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfuly`,
            data: loggedInUser,
        });
    } catch (error) {
        res.status(400).send("ERror : " +error.message)
    }
})

module.exports = profileRouter;