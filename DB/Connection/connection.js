const mongoose=require("mongoose")


const initConnection=()=>{
    return mongoose.connect(process.env.DBCONNECTION).then(console.log("connected"))
}

module.exports=initConnection