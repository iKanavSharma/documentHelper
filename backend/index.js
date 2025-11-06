require('dotenv').config();
const express=require("express");
const db=require("./database/db");
const authRoutes=require("./routes/login");
const statRoutes=require("./routes/stats");


const app=express();

app.use(express.json());

//db check
app.get("/",(req,res)=>{
    res.send("Server up");
})
//login api
app.use("/api/auth",authRoutes);

//stats api
app.use("/api/admin",statRoutes);

app.listen(3000);