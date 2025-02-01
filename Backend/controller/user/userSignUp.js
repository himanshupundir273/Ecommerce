const UserModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { name, email, password } = req.body;
    
    const user=await UserModel.findOne({email})

    if(user){
        throw new Error("Already user exists")
    }
    if (!email) {
      throw new Error("Please Provide email");
    }
    if (!name) {
      throw new Error("Please Provide name");
    }
    if (!password) {
      throw new Error("Please Provide password");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }
    const payload = {
      ...req.body,
      role:"GENERAL",
      password: hashPassword,
    };

    const userData = new UserModel(payload);
    const saveUser = userData.save();
    res.status(201).json({
        data:saveUser,
        success:true,
        error:false,
        message:"user created successfully"
    })

  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports=userSignUpController
