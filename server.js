require('dotenv').config()

const express=require('express')
const cloudinary=require('./cloudinary')
const upload=require('./multer')
var cors = require('cors')
const app=express()

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/',upload.single("video"),async(req,res) => {
    console.log(req.file.path);
    const result=await cloudinary.uploader.upload(req.file.path,{
        "folder":"YoutubeClone",
        "resource_type":"video",
        "quality":"30"
    });
    res.json({video:result});
})

app.use('/image',upload.single("image"),async(req,res) => {
    console.log(req.file.path);
    const result=await cloudinary.uploader.upload(req.file.path,{
        "folder":"YoutubeClone",
        "quality":"80"
    });
    res.json({image:result});
})

app.listen(process.env.PORT || 4000,()=>{
    console.log('server running at port')
})
