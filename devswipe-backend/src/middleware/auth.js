const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      // throw new Error("Invalid token!!!!!!!!!!!1");
      return res.status(401).send('please login');
    }

    const decodeObj = await jwt.verify(token, process.env.JWT_SECRET);
    
    const { _id } = decodeObj;
    
    
    const user = await User.findById(_id);
    
    if (!user) {
      throw new Error("user does not exist");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(200).send("Error:" + error.message);
  }
};

module.exports = {
  userAuth,
};
