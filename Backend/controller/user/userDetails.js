const userModel =require("../../models/userModel")
async function userDetails(req,res){
    try{
        const user=await userModel.findById(req.userid)
        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"userdetails"
        })
        console.log("user",user)

    }
    catch(err){
        res.status(400).json({
            message:err.message||err,
            error:true,
            success:false
        })
    }

}

module.exports=userDetails