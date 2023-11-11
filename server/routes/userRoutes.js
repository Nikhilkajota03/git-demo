const router = require('express').Router();
const User  = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware")



//register

router.post("/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const user = await User.findOne({email:req.body.email})

    if (user) {
        res.status(402).json({ message: "User already exists" });
        return;
      }
      
    else{
      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hashSync(password, salt);
      const newUser = new User({
        name:  username,
        email: email,
        password: hashpass,
      });
      const save = await newUser.save();
      res.status(200).json(save);
    }

    } catch (err) {
      res.status(400).json(err);
    }
  });


   
  //login

  router.post("/login", async (req, res) => {
    try {
      //   const {email,password}= req.body;
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json("user not found");
      }
  
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.status(401).json("wrong credentials");
      }
  
      //  res.status(200).json(user);
  
      const token = jwt.sign(
        { userId : user._id, username: user.name, email: user.email },
         "nafafifjfi",
        { expiresIn: "1d" } 
      );
      const { password, ...info } = user._doc;
      res.cookie("token", token).status(200).json(info);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  // get current user

  
router.get('/get-current-user',authMiddleware, async (req, res) => {
  try {
    
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



  module.exports = router;