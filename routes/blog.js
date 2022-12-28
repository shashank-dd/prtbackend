const express=require("express")
const route=express.Router();
const cors = require("cors");
var jwt = require('jsonwebtoken');
route.use(cors({
    origin: "*",
}))
const data=require("../models/data.js")
route.use(express.json())
const cloudinary=require("cloudinary").v2
const  fileupload= require("express-fileupload")
const bodyParser = require("body-parser");
route.use(bodyParser.urlencoded())
route.use(bodyParser.json())
route.use(fileupload({
    useTempFiles:true,
    limits:{fileSize :50*2024*1024}
}))
cloudinary.config({ 
    cloud_name: 'dzzixdcs1', 
    api_key: '961216453729524', 
    api_secret: 'uUbIi8ygFiiVwJJeuq8aXRqO2kk' 
  });
route.post("/post",async(req,res)=>{
    try {
console.log(req.body)
        console.log("rout comming")
        const file=req.files.image;
        const result =await cloudinary.uploader.upload(file.tempFilePath,{
            public_id:`${Date.now()}`,
            resource_type:"auto",
            folder:"images"
           })
        const dat=await data.create({
            name:req.body.name,
           title:req.body.title,
           image:result.url,
           description:req.body.description
          }) 
        res.json({
            ok:"ok",
            data:dat

        })
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})

route.post("/data",(req,res)=>{
    try {
        console.log("coming  to data")
console.log(req.body.token)

if(req.body.token){
    // verify a token symmetric
    console.log(8)
    jwt.verify(req.body.token,process.env.SECRET, async function(err, decoded) {
        if(err) {
            return res.status(403).json({
                status: "failed",
                message: "Not a valid token"
            })
        }
        console.log(8)
        console.log(decoded.data,decoded,1 )
        console.log(0)
   const     nam =  decoded.data.split("@")[0];
   console.log(nam)
        const dat=await data.find({
            name : nam,
           
          }) 
          console.log("data",dat)
          
        res.json({
            ok:"data",  
            dat:dat  ,
            user:nam  ,
            userid:  decoded.data           
            

        })
    
    });
}else {
    return res.status(401).json({
        status: "Failed",
        message: "Toeken is missing"
    })
}
    } catch (e) {
        res.json({
            err:e.message
        })
    }
   
})










 module.exports= route;