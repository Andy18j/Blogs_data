

const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title:{type:String,required:true},
    content : {type:String,required:true},
    category : {
        type : String,
        enum : ["Business","Tech","Lifestyles","Entertainment"], required:true
    },
    date : {type:Date,default:Date.now},
    userID : {type :mongoose.Schema.Types.ObjectId,ref:"user"},
    likes : {type : Number,default:0},
    Comments : [{username:String,content:String}]
})

const blogmodel = mongoose.model("blog",blogSchema)


module.exports =  {
    blogmodel
}