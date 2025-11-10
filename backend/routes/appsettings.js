const express=require("express");
const db=require("../database/db");
const { success } = require("zod");

const router=express.Router();

//get app version
router.get("/app/version",async (req,res)=>{
    try{
        const [rows]=await db.query('SELECT * FROM app_settings ORDER BY updated_at DESC,id DESC LIMIT 1');

        if(rows.length===0){
            res.json({
                success:false,
                message:"No version information found"
            });
            return;
        }

        const versionData=rows[0];
        res.json({
            current_version:versionData.current_version,
            force_update:!!versionData.force_update,
            message:versionData.message
        });
    }catch(error){
        console.error("Error fetching version",error);
        res.status(500).json({
            success:false,
            error:"Internal server error"
        })
    }
})

router.post("/admin/app/version/update",async(req,res)=>{
    try{
        const {version,force_update,message}=req.body;
        if(!version || typeof force_update==="undefined" || !message){
            res.status(400).json({
                success:false,
                message:"All fields are required"
            });
            return
        }

        const forceUpdatedValue=force_update===true || force_update==="true"?1:0;

        const [existing]=await db.query('SELECT * FROM app_settings ORDER BY id DESC LIMIT 1');
        if(existing.length===0){
            await db.query('INSERT INTO app_settings (version,force_update,update_message,updated_at) VALUES (?,?,?,NOW())',[version,forceUpdatedValue,message]);
        }else{
            await db.query('UPDATE app_settings SET version=?,force_update=?,update_message=?,updated_at=NOW() WHERE id=?',[version,forceUpdatedValue,message,existing[0].id]);
        }
        res.json({
            success:true,
            message:"Version Updated successfully!!!" 
        })
    }catch(error){
        console.error("Error updating app version",error);
        res.status(500).json({
            success:false,
            error:"Internal Server error"
        })
    }
})

module.exports=router;