const express = require("express");
const  mongoose  = require("mongoose");
const dotenv = require("dotenv").config()
const app = express();

mongoose.connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => { console.log("connect to cloud db") })
const login = require("./routes/login")
const register = require("./routes/register")
const blog = require("./routes/blog");






const port = process.env.PORT || 8080
app.use(express.json());                                
app.use("/login", login)
app.use("/register", register)
app.use("/blog", blog)
app.get("*", (req, res) => {
    res.status(404).json("page not found")
})
app.listen(port, () => {
    console.log(`server started at port http://localhost:${port}`)
})

