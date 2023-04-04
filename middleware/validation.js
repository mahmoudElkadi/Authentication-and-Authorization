const{validationResult}=require("express-validator")

const handlevalidation=()=>{
return (req,res,next)=>{
    const validatiomRes=validationResult(req)
    if(validatiomRes.isEmpty()){
        next()
    }else{
        res.status(400).json({message:"error Valid",validatiomRes})
    }
}
}

module.exports=handlevalidation