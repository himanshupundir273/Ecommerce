const UserModel = require("../../models/userModel");

async function allUsers(req, res) {
  try {
    console.log("users",req.userId)
    const allUser=await UserModel.find()
    res.json({
        message:"All User",
        data: allUser,
        success:true,
        error:false
    })



  } catch (err) {
    res.status(400).json({
        message:err||err.message,
        error:true,
        success:false
    });
  }
}

module.exports=allUsers