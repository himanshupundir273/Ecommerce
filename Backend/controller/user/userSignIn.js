const UserModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


async function userSignIncontroller(req,res){
    try{
        const {email,password}=req.body;
        
        if(!email){
            throw new Error("please provide email");
        }
        if(!password){
            throw new Error("please provide password");
        }
        const user=await UserModel.findOne({email});
        
        if(!user){
            throw new Error("User not found");
        }
        const checkPassword = await bcrypt.compare(password,user.password)
        console.log("check password",checkPassword)
        if(checkPassword){
            const tokenData={
                _id:user._id,
                email:user.email
            }
            const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8});

            const tokenOption = {
                httpOnly: true,
                secure: true, // Ensures the cookie is only sent over HTTPS
                sameSite: "none", // Required for cross-origin requests
            };

            res.cookie("token",token,tokenOption).json({
                message:"Login Successfully",
                data:token,
                success:true,
                error:false
            })

        }
        else{
            throw new Error("please check password")
        }
    }
    catch(err){
        res.json({
            message:err.message||err,
            error:true,
            success:false
        })
    }

}

module.exports=userSignIncontroller;