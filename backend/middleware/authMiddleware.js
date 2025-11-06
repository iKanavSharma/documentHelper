const jwt=require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET;
const authMiddleware=(req,res,next)=>{
    const token=req.headers["authorization"];
    if(!token){
        res.status(401).json({
            message:"No token"
        })
        return;
    }
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        req.user=decoded;
        next();
    }catch(e){
        res.status(401).json({
            message:"Invalid token"
        })
    }
}

module.exports=authMiddleware;