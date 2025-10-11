const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");
const getJWT = require("./models/user");
const cors = require("cors")
const http = require('http');

require('dotenv').config()
app.use("/payment/webhook", express.raw({ type: "application/json" }));
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend URL
  credentials: true,  // Allow cookies/credentials
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],  // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
}));
app.options('*', cors());  // This handles all OPTIONS requests for CORS preflight

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter); 
app.use('/',userRouter); 
app.use('/',paymentRouter);
app.use("/", chatRouter);

/*****************************delployment */

const path = require('path');

const _dirname = path.resolve();

app.use(express.static(path.join(_dirname, "devswipe-frontend/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.resolve(_dirname,"devswipe-frontend", "dist", "index.html"))
})
/*****************************delployment */


const server = http.createServer(app);
initializeSocket(server);

connectDb() 
  .then(() => {
    console.log("database connnected successfully");
    server.listen(process.env.port, (req, res) => {
      console.log("server is started");
    });
  })

  .catch((err) => {
    console.error("error while connecting db");
  });





  

  // get user by email
  //app.get("/user", async (req, res) => {
    //   const userEmail = req.body.email;
    //   try {
    //     console.log(userEmail);
    //     const user = await User.findOne({ email: userEmail });
    //     if (!user) {
    //       res.send("user not found");
    //     } else {
    //       res.send(user);
    //     }
    //   } catch (error) {
    //     res.send("error " + error.message);
    //   }
    // });
    
    // // feed api
    // app.get("/feed", async (req, res) => {
    //   try {
    //     const users = await User.find();
    //     res.send(users);
    //   } catch (error) {
    //     res.send("error " + error.message);
    //   }
    // });
    
    // // delete user
    // app.delete("/delete", async (req, res) => {
    //   const userId = req.body.id;
    //   try {
    //     const user = await User.findByIdAndDelete({ _id: userId });
    //     res.send("user deleted successfully");
    //   } catch (error) {
    //     res.send("Error" + error.message);
    //   }
    // });
    
    // // update user
    // app.patch("/user", async (req, res) => {
    //   const userId = req.body.id;
    //   const data = req.body;
    //   try {
    //     const Allowed_update = ["photUrl", "about", "gender", "age", "skills"];
    //     const isUpdateAllow = Object.keys(data).every((k) => {
    //       Allowed_update.includes(k);
    //     });
    //     if (!isUpdateAllow) {
    //       throw new Error("update not allowed");
    //     }
    //     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
    //       returnDocument: "after",
    //       runValidators: true,
    //     });
    //     res.send("updated successfully");
    //   } catch (err) {
    //     res.status(400).send("Error " + err.message);
    //   }
    // });