const express=require("express");
const db=require("../database/db");
const jwt=require("jsonwebtoken");
const verifyToken=require('../middleware/authMiddleware');

const router=express.Router();

router.get('/user/stats',verifyToken,async (req,res)=>{
    try{
        const [totalResults]=await db.query('SELECT COUNT(*) AS total_users FROM users');
        const [activeResults]=await db.query('SELECT COUNT(*) AS active_users FROM users WHERE last_active IS NOT NULL');
        const [countryResults]=await db.query('SELECT country, COUNT(*) AS count FROM users WHERE country IS NOT NULL GROUP BY country');

        res.json({
            total_users:totalResults[0].total_users,
            active_users:activeResults[0].active_users,
            locations:countryResults
        })
    }catch(error){
        console.log("Error fetching admin stats",error);
        res.status(500).json({
            message:"Server error while fetching stats"
        });
    }
})

module.exports=router;