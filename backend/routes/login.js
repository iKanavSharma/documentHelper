const express=require("express");
const db=require("../database/db");
const jwt=require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET;

const router=express.Router();

router.post('/login',async (req,res)=>{
    
    const {email}=req.body;

    //if nothing is eneterd
    if(!email){
        res.status(400).json({
            sucess:false,
            message:"Email is required"
        });
        return
    }
    //extra field
    if(Object.keys(req.body).length>2){
        res.status(400).json({
            success:false,
            message:"Only email is required"
        });
        return
    }
    //validating email type
    //const emailRegex=ff;
    //main logic
    try{
        //check if email exist
        const [rows]= await db.query('SELECT * FROM users WHERE email = ?',[email]);
        //mail exist
        
        let userId;
        let message;
        if(rows.length>0){
            userId=rows[0].id;
            message="Login successful";
        }else{
            const [result]=await db.query('INSERT INTO users (email,created_at) VALUES (?,NOW())',[email]);
            userId=result.insertId;
            message="User registered successfully";
        }

        //create token
        const token=jwt.sign({id:userId,email},JWT_SECRET);
        
        res.json({
            sucess:true,
            user_id:userId,
            email,
            token,
            
            message
        });
        
    }catch(error){
        console.log("Error in logging in",error);
        return res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
})

module.exports=router;