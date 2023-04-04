const mongoose=require("mongoose")
const bcrypt = require('bcrypt');


const userSchema=new mongoose.Schema({
    userName:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    firstName:{type:String},
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        default:"male"
    },
    age:{
        type:Number
    },
    confirmed:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"user"
    },
    profilePic:String,
    coverPics:Array,
    flowers:Array,
    friends:[{name:String,id:String,chatId:String}]
})


userSchema.pre("save",function(next){
    this.password=bcrypt.hashSync(this.password,parseInt(process.env.SALT))

    next()
}) 


const userModel=mongoose.model("user",userSchema)



module.exports=userModel