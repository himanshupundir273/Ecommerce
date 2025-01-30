const UserModel =require("../../models/userModel")

async function updateUser(req, res) {
    try {
        const sessionUser=req.userId;
        const { userId, email, name, role } = req.body;

        console.log("usderid",userId)

        const payload = {
            ...(role && { role })
        };
        const user=await UserModel.findById(sessionUser)
        console.log("user.role",user?.role)
        const UpdateUser = await UserModel.findByIdAndUpdate(userId, payload);
        res.json({
            data: UpdateUser,
            message: "User Updated",
            error: false,
            success: true,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}
module.exports=updateUser;
