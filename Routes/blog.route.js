const express = require('express')
const {auth} = require("../Auth/auth")
const {blogmodel} = require("../model/blog.model")
require("dotenv").config()


const blogRouter = express.Router()

blogRouter.get("/api/blogs",auth,async(req,res)=>{
    try {
         const {userId} = req.body
         const get = await blogmodel.find({$and:[{userId}]})
         console.log(get)
         res.status(201).json({msg:"your blogs",get})

    }
    catch(err){
        console.log(err)
        res.status(501).send({msg:"internal server error"})
    }
})



blogRouter.post("/api/blogs",auth,async(req,res)=>{
    try {
        const data = req.body
        const newBlog = new blogmodel(data)
        await newBlog.save()
        console.log(newBlog)
        res.status(201).json({msg:"blogs are posted sucessfullyy 🥳"})

    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"blogs are not posted"})
    }
})


//for seraching blogs

blogRouter.get("/api/blogs?title=”Present",auth,async(req,res)=> {
try{
       const title = req.body.title

       if (!title) return res.status(401).send({msg:"not found this type of title"})


       const thetitle = blogmodel.filter(blogmodel=>blogmodel.filter.includes(title))

       if (thetitle.length===0) return res.status(404).json({msg:"this types are blogs are not found"})

       res.status(201).json({msg:"blogs are match"},title)

}
catch(err){
    console.log(err)
    res.status(404).json({msg:"Internal server error"})
}
})


blogRouter.delete("/api/blogs/:id",auth,async(req,res)=> {
    try{
        // const id = req.params.id
        const deleteblog = await blogmodel.findByIdAndDelete(req.params.id)
         res.status(200).send({msg:"blogs are deleted sucessfully🥳"})
    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"something went wrong"})
    }
})

blogRouter.get("/api/blogs?category=tech",auth,async(req,res)=>{
    const {category} = req.quary()
    if (!category){
        return res.status(501).json({msg:"something went wrong"})
    }
    const filterblogs = blogmodel.filter((blogmodel) => blogmodel.category===category)
    res.status(200).send({msg:"blogss"},filterblogs)
})


blogRouter.get("/api/blogs?sort=date&order=asc",auth,async(req,res)=>{
    const {sort,order} = req.query
    if (sort==='date' && (order==='asc')){
        const sortblogs = blogmodel.sort((a,b)=>{
            return order==='asc'
           ?  new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
        })
        res.status(201).json({msg:"blogs are sorted by date"},sortblogs)

    }else{
        res.jsonstatus(400)
    }
})

module.exports = {
    blogRouter
}