const jwt=require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json("you are not authenticated")
    }

    jwt.verify(token,"nafafifjfi",async (err,data)=>{
         if(err){
            return res.status(403).json("Token is not valid!")
         }
         req.body.userId = data.userId;
         next();
    })
}

module.exports=verifyToken;