const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { restaurantProtected } = require("./middelwares/protected")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",require("./routes/auth.routes"))
app.use("/api/restaurant",restaurantProtected ,require("./routes/restaurant.routes"))
app.use("*",(req,res)=>{
    res.status(404).json({message:"resource not found"})
})
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json({message:"server error"})
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open",()=>{
    console.log("db connected");
    app.listen(process.env.PORT || 5000,console.log("server running"))
})