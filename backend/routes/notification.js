const express=require("express");
const db=require("../database/db");
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

router.post("/send",upload.single("image"),async (req,res)=>{
    try{
        const {title,body,image_url,page}=req.body;
        const uploadedImage=req.file;
        if(!title || !body || !page){
            res.status(400).json({
                success:false,
                message:"All fields are required"
            })
            return;
        }
        let finalimageurl;
        if(uploadedImage){
            finalimageurl=`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }
        else if(image_url){
            finalimageurl=image_url;
        }else{
            res.status(400).json({
                success:false,
                message:"Image is required!"
            })
            return;
        }
        const [results]=await db.query('INSERT INTO notifications (title,body,image_url,page) VALUES (?,?,?,?)',[title,body,finalimageurl,page]);
        res.json({
            status:"sent",
            sent_to:"all_users",
            notification_id:results.insertIdid,
            image_url:finalimageurl
        })
    }catch(error){
        console.error("Error sending notification",error);
        res.json({
            
            error:"Server error"
        })
    }
})

//api to get all notifications
router.get("/all",async(req,res)=>{
    try{
        const [rows]=await db.query('SELECT * FROM notifications ORDER BY sent_at DESC');
        if(rows.length==0){
            res.json({
                message:"No notification found"
            })
            return
        }
        res.json(rows);
    }catch(error){
        console.error("Error fetching notifications",error);
        res.status(500).json({
            error:"Server error"
        })
    }
})

module.exports=router;