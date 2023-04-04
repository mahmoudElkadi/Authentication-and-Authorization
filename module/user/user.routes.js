const userRouter=require("express").Router()
const {userSignUp,confirmedEmail,signIn,updateName}=require("./controller/user.controller")
const handlevalidation=require("../../middleware/validation")
const userValidation=require("./userValdation")
const {auth} = require("../../middleware/auth")
const endPoint=require("./endpoint")

userRouter.post("/user/signUp",userValidation,handlevalidation(userValidation),userSignUp)
userRouter.post("/signUp",userValidation[1,2],handlevalidation(userValidation),signIn)
userRouter.get('/userConfirm/:token',confirmedEmail)

userRouter.patch("/user/updateName",auth(endPoint.updateName),updateName)






module.exports=userRouter







