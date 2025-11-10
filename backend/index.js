require('dotenv').config();
const express=require("express");
const db=require("./database/db");
const authRoutes=require("./routes/login");
const statRoutes=require("./routes/stats");
const notificationRoutes=require("./routes/notification");
const documentRoutes=require("./routes/document");
const cors=require("cors");


const app=express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//db check
app.get("/",(req,res)=>{
    res.send("Server up");
})
//login api
app.use("/api/auth",authRoutes);

//stats api
app.use("/api/admin",statRoutes);

//uploafd api
app.use('/uploads', express.static('uploads'));

//notifications api
app.use("/api/admin/notifications",notificationRoutes);
//documnet send
app.use("/api/document",documentRoutes);
//document received
app.use("/api/document",documentRoutes);

app.listen(3000);