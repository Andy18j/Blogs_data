// const express = require("express")
// const jwt = require("jsonwebtoken")
require("dotenv").config()
const {userRouter} = require("../Routes/user.route")
const { userModel } = require("../model/user.model")

// const auth = async (req,res,next) => {
//     try {
//         const token = req.headers?.authorization?.split(" ")[1]
// 
//         if (!token) return res.status(504).json({msg:"please login again"})

//         const istokenvalid = await jwt.verify(token,"secret")

//         if (!istokenvalid) return res.status(204).json({msg:"authentication faild please login again"})

//         const istokenblacklisted = await userModel(token)

//         if (istokenblacklisted) return res.json({msg:"unauthorized"})

//         req.body.userId = istokenvalid.userId
//         req.body.blog = istokenvalid.blogRouter
//         next()
//     }
//     catch(err){
//         console.log(err)
//         res.status(501).json({msg:"something went wrong"})
//     }
// }

const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
       const decoded= jwt.verify(token.split(" ")[1],"masai")
       if(decoded){
       req.body.username=decoded.UserName;
        next()
       }else{
        res.status(400).send({"msg":"Please login first"})
       }
    }else{
        res.status(400).send({"msg":"Please login first"})
    }

}

module.exports={
    auth
}


module.exports = {
    auth
}