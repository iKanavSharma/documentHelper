const express=require("express");
const db=require("../database/db");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");

const router=express.Router();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');//storing file in upload folder
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9);
        cb(null,uniqueSuffix+path.extname(file.originalname));
    }
})
const upload=multer({storage:storage});


router.post("/send",upload.single("file"),async (req,res)=>{
    const {sender_id,receiver_id,file_url,file_name}=req.body;
    const uploadedFile=req.file;
    //check
    if(!sender_id || !receiver_id ){
        res.status(400).json({
            success:false,
            message:"Sender id and receiver id are required"
        })
        return;
    }
    try{
        let finalFileName;
        let finalFileUrl;
        //upload
        if(uploadedFile){
            finalFileName=uploadedFile.originalname;
            finalFileUrl=`${req.protocol}://${req.get('host')}/uploads/${uploadedFile.filename}`;
        }//eneterd manually
        else if(file_name && file_url){
            finalFileName=file_name;
            finalFileUrl=file_url
        }
        //both are empty
        else{
            res.status(400).json({
                success:false,
                message:"File name and File url are missing"
            })
            return;
        }
        const [results]=await db.query('INSERT INTO documents (sender_id,receiver_id,file_url,file_name) VALUES (?,?,?,?)',[sender_id,receiver_id,finalFileUrl,finalFileName]);
        res.json({
            success:true,
            message:"File sent successfully",
            file_name:finalFileName,
            file_url:finalFileUrl
        });
    }catch(error){
        console.error("Server error while uploading documnet",error);
        res.status(500).json({
            success:false,
            message:"Database error while uploading file"
        });
    }
});

router.get("/received",async (req,res)=>{
    try{
        const {user_id}=req.query;

        const [rows]=await db.query('SELECT id AS doc_id,file_name,file_url,sender_id,sent_at AS received_at FROM documents WHERE receiver_id = ? ORDER BY sent_at DESC',[user_id]);
        res.json(rows);
    }catch(error){
        console.error("Error",error);
        res.status(500).json({
            sucess:false,
            message:"Server error"
        })
    }
})

module.exports=router;
