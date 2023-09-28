const express = require("express")
const { connection } = require("./config/db")
require("dotenv").config()
const {userRouter} = require("./Routes/user.route")
const {blogRouter}  = require("./Routes/blog.route")

const app = express()
app.use(express.json())


app.use("",userRouter)
app.use("",blogRouter)


app.get("/",(req,res)=>{
    res.send("HOME PAGEEE🏠")
})


app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("Connected to the DB")

    }
    catch(err){
        console.log(err)
        console.log("Not connected to the db")
    }
    console.log(`port is running on the ${process.env.PORT}`)
})