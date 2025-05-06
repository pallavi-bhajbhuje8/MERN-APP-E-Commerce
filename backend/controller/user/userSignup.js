const userModel = require("../../models/usermodel")
const bcrypt = require("bcryptjs")

async function userSignupController(req, res) {
    try {
        const { email, password, name } = req.body
        // console.log("req.body", req.body)
        const user = await userModel.findOne({ email })
        console.log("user", user)
        if (user) {
            throw new Error("Already user exists.")
        }
        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide password")
        }
        if (!name) {
            throw new Error("Please provide name")
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something is wrong")
        }
        const payload = {
            ...req.body,
            role: "GANERAL",
            password: hashPassword
        }
        const userData = new userModel(payload)
        const saveUser = await userData.save()
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created Successfuly!"
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })

    }
}
module.exports = userSignupController;