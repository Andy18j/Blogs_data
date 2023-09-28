const express = require("express")

const {userModel} = require("../model/user.model")
const bcrypt  = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
// const {auth} = require("../Auth/auth")


const userRouter = express.Router()

userRouter.post("/api/register",async(req,res)=>{
    
    try{
        const {username,avatar,email,password} = req.body
        const user = await userModel.findOne({email})
        if (user) return res.status(204).json({msg:"user are already present!!"})

        const hash = await bcrypt.hash(password,6)

        const newuser = new userModel({username,avatar,email,password:hash})
         await newuser.save()
         res.status(201).json({msg:'User are Registed Successfully!'})

    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"internal server error"})
    }   
})

userRouter.post("/api/login",async(req,res)=>{
        try{
            const {email,password} = req.body
    
            const isuserpresent = await userModel.findOne({email})
    
            if (!isuserpresent) return res.status(501).json({msg:"user not present!! please signUp"})
    
            const ispasscorrect = await bcrypt.compare(password,isuserpresent.password)
    
            const token =  jwt.sign({userId:isuserpresent._id},"secret",{
                expiresIn:"5min"
            })
            if (ispasscorrect){
                return res.status(201).json({msg:"Login Sucessfully🥳 ",token})
            }else{
                res.status(501).json({msg:"wrong credentials"})
            }
        }

    catch(err){
        console.log(err)
        res.status(501).json({msg:"Wrong Credentials"})
    }

})













module.exports={
    userRouter
}