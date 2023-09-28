const express = require("express")
const jwt = require("jsonwebtoken")
const {userRouter} = require("../Routes/user.route")
const { userModel } = require("../model/user.model")

const auth = async (req,res,next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]

        if (!token) return res.status(504).json({msg:"please login again"})

        const istokenvalid = await jwt.verify(token,process.env.jwt_secret)

        if (!istokenvalid) return res.status(204).json({msg:"authentication faild please login again"})

        const istokenblacklisted = await userModel.get(token)

        if (istokenblacklisted) return res.json({msg:"unauthorized"})

        req.body.userId = istokenvalid.userId
        req.body.blog = istokenvalid.blogRouter
        next()
    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"something went wrong"})
    }
}


module.exports = {
    auth
}