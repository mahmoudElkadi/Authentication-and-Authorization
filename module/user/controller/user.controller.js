
const userModel = require('../../../DB/Model/user.Model')
const sendEmail=require("../../../middleware/sendEmail")
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');
 


const userSignUp=async(req,res)=>{
   try {
        const{userName,email,password,firstName,profilePic,gender}=req.body
        let user=await userModel.findOne({email})
        if(user){
            res.status(400).json({message:"user already exist"})
        }
        else{
            let newUser=new userModel({userName,email,password,firstName,profilePic,gender})
            let addUser=await newUser.save()
            var token = jwt.sign({id:addUser._id}, process.env.JWTKEY);
            //console.log(token);
            
            sendEmail(email,`<a href="${req.protocol}://${req.headers.host}/userConfirm/${token}">confirmed request</a>`)
            console.log(email);


            res.status(201).json({message:"addUser",addUser})
        }

    } catch (error) {
        res.status(500).json({message:"error",error})
    }

}

const signIn=async(req,res)=>{
const {email,password}=req.body
const user=await userModel.findOne({email})
if(user){
    bcrypt.compare(password,user.password,(err,result)=>{
        if (result){
            var token = jwt.sign({id:user._id,isLogin:true}, process.env.JWTKEY);

            res.json({message:"welcome",token})

        }else{
            res.status(500).json({message:"password not exist"})

        }
    })

}else{
    res.status(500).json({message:"user not exist"})

}
}

const updateName=async(req,res)=>{
try {
    const {userName}=req.body
    const findUser=await userModel.findByIdAndUpdate({_id:req.user._id},{userName},{new:true})
            res.status(201).json({message:"updateUser",findUser})

} catch (error) {
    res.status(500).json({message:"Error",error})

}
}





const confirmedEmail=async(req,res)=>{
try {
    const {token}=req.params
    const {id}=jwt.verify(token,process.env.JWTKEY)
    console.log(id);

    let user=await userModel.findOne({_id:id,confirmed:false},{})
    if(user){
    let updateUser= await userModel.findByIdAndUpdate(id,{confirmed:true},{new:true})
        res.json({message:"confirme",updateUser})
    }    
    
} catch (error) {
    res.status(500).json({message:"error",error})

}
}




module.exports={userSignUp,confirmedEmail,signIn,updateName}




// const{userName,email,password,firstName,gender,age,confirmed,role,profilePic,coverPics,flowers}=req.body
