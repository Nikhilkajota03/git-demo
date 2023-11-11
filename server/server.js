const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors=require('cors')
const cookieParser=require('cookie-parser')
const userRoute = require('./routes/userRoutes');



mongoose
  .connect("mongodb://127.0.0.1:27017/college-app", {
    
  })
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });


  app.use(cors({origin:"http://localhost:3000",credentials:true}))
  app.use(express.json())
  app.use(cookieParser())


  app.use("/api/users/", userRoute)



  app.listen(5000, () => {
    console.log("server is running on port" + " " + 5000);
  });