const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/task")

const db=mongoose.connection
db.on("connected",()=>{
console.log("database connected")
})

db.on("error",(err)=>{
console.log(err)
})