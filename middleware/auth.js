const jwt=require("jsonwebtoken");

require("dotenv").config();


exports.auth=async(req,res,next)=>{
    try{
        const token=req.body.token || req.cookies.token ||
        req.header("Authorization").replace("bearer","")
        if(!token){
            res.status(400).json({
                success:false,
                message:'token is missing'
            });
        }

        try{
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);
            //req.user=req.user.toObject();
            req.user=payload;
           // console.log(typeof(req.user));
          //  console.log(payload.role);

        }

        catch(err){
            res.status(400).json({
                success:false,
                message:'token is invalid'
            });

        }
        next();
    }
    catch(err){
       
        res.status(500).json(
            {
                success:false,
               
                message:'kuch gadbad hai bhai',
            }
        )

    }
}

exports.isstudent=async(req,res,next)=>{
    try{
     const userrole=req.user.role;
    // console.log(req.body);
   // console.log(userrole);
   
        if(userrole!=="Student"){
            return res.status(500).json({
                success:false,
                message:'not a student'
            })
        }
        next();

    }
    catch(error){
        res.status(500).json(
            {
                success:false,
               
                message:'kuch gadbad hai bhai',
            }
        )

    }
}
exports.isprincipal=async(req,res,next)=>{
    try{

        if(req.user.role!=="Principal"){
            return res.status(500).json({
                success:false,
                message:'not a principal'
            })
        }
        next();

    }
    catch(error){
        res.status(500).json(
            {
                success:false,
               
                message:'kuch gadbad hai bhai',
            }
        )

    }
}
exports.isteacher=async(req,res,next)=>{
    try{

        if(req.user.role!=="Teacher"){
            return res.status(500).json({
                success:false,
                message:'not a teacher'
            })
        }
        next();

    }
    catch(error){
        res.status(500).json(
            {
                success:false,
               
                message:'kuch gadbad hai bhai',
            }
        )

    }
}