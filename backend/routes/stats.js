const express=require("express");
const db=require("../database/db");
const jwt=require("jsonwebtoken");
const verifyToken=require('../middleware/authMiddleware');

const router=express.Router();

router.get('/user/stats',verifyToken,async (req,res)=>{
    try{
        //getting total and active users
        const [countResults]=await db.query('SELECT COUNT(*) AS total_users, SUM(last_active IS NOT NULL) as active_users FROM users');
        const total_users=countResults[0]?.total_users || 0;
        const active_users=countResults[0]?.active_users || 0;
        //pagination
        const page=parseInt(req.query.page) || 1;
        const limit=parseInt(req.query.limit) || 10;
        const offset=(page-1)*limit;

        const [countryResults]=await db.query('SELECT country,COUNT(*) AS count FROM users WHERE country IS NOT NULL GROUP BY country ORDER BY count DESC LIMIT ? OFFSET ?',[limit,offset]);
        const [totalCountriesResult]=await db.query('SELECT COUNT(DISTINCT COUNTRY) AS total_countries FROM users WHERE country IS NOT NULL ');
        const total_countries=totalCountriesResult[0]?.total_countries || 0;
        const total_pages=Math.ceil(total_countries/limit);

        res.json({
            total_users,
            active_users,
            locations:countryResults,
            pagination:{
                page,
                limit,
                total_pages,
                total_countries
            }
        })
    }catch(error){
        console.log("Error fetching admin stats",error);
        res.status(500).json({
            message:"Server error while fetching stats"
        });
    }
})

module.exports=router;