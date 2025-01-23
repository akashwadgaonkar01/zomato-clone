const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { restaurantProtected, customerProtected, adminProtected, riderProtected } = require("./middelwares/protected")
const { app, httpServer } = require("./socket/socket")

// const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.static("dist"))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/restaurant", restaurantProtected, require("./routes/restaurant.routes"))
app.use("/api/customer", customerProtected, require("./routes/customer.routes"))
app.use("/api/admin", adminProtected, require("./routes/admin.routes"))
app.use("/api/rider", riderProtected, require("./routes/rider.routes"))

app.use("*", (req, res) => {
    // res.status(404).json({ message: "resource not found" })
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "server error" })
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("db connected");
    httpServer.listen(process.env.PORT || 5000, console.log("server running"))
})