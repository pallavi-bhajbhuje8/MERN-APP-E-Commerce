
const bcrypt = require('bcryptjs')
const userModel = require("../../models/usermodel");
const jwt = require('jsonwebtoken');
async function userSigninController(req, res) {

    try {
        const { email, password } = req.body
        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide password")
        }
        const user = await userModel.findOne({ email })

        if (!user) {
            throw new Error("User not found")
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        console.log("CheckPassword", checkPassword);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            }
            const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 8 });
            const tokenOption = {
                httpOnly: true,
                secure: false,

            }
            res.cookie("token", token, tokenOption).json({
                message: "Login successfuly",
                data: token,
                success: true,
                error: false
            })

        } else {
            throw new Error("Please check Password")
        }
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,

        })

    }

}
module.exports = userSigninController


