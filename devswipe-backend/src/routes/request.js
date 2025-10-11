const express = require('express');
const { userAuth } = require('../middleware/auth');
const User = require('../models/user');
const ConnectionRequestModel = require('../models/connectionRequest');
const requestRouter = express.Router();


// requestRouter.post("/sendConnectionRequest",userAuth, async(req,res)=>{
//     const user = req.user;
//     res.send(user.firstName + " has sent request");
// })

requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message : "user not found"
            })
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            res.status(400).json({message : "user not found"});
        }

        // if(fromUserId.equals(toUserId)){
        //     throw new Error("cannot send connection req yourself")
        // }

        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or :[
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        })
        if(existingConnectionRequest){
            return res.status(400).json({message : "connection request already exist!!"})
        }
        

        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();

        res.status(200).json({
            message : req.user.firstName + " " + status + " "+ toUser.firstName,
            data,
        })

    } catch (error) {
        res.status(400).send("Error: "+error.message);
    }
})

requestRouter.post("/request/review/:status/:requestId",userAuth, async (req,res)=>{
    try {
        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message : "status not allowed!"});
        }
        
        const connectionRequest = await ConnectionRequestModel.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status : "interested"
        })
        if(!connectionRequest){
            return res.status(400).json({message : "connection request not found"});
        }
        
        connectionRequest.status = status;
        
        const data = await connectionRequest.save();

        return res.status(200).json({
            message : "connection request "+ status,
            data
        })


    } catch (error) {
        res.status(400).send("Error :" + error.message);
    }
})
module.exports = requestRouter;