import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import adminModel from "../../models/Admins/Admins.js";
import trailerModel from "../../models/Trailers/Trailer.js";
import userModel from "../../models/Users/Users.js";
import videoModel from "../../models/Videos/Videos.js";

const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        let userData = req.body
        let userEmail = userData.email;
        let checkDuplicate = await userModel.findOne({ email: userEmail })
        if (checkDuplicate) {
            return res.status(400).json({ msg: "user is already registered! Please login" })
        }
        let hashPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashPassword
        await userModel.create(userData)

        let secretKey = "SNEHA"
        let sendToken = jwt.sign({checkDuplicate}, secretKey, {expiresIn: "1h"})
        console.log(sendToken);
        
        res.status(200).json({ msg: "user registered", token: sendToken})

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

router.post("/login", async(req, res) => {
    try {
        let {email, password} = req.body;
        let checkUser = await userModel.findOne({email})
        console.log(email);
        console.log(password);
        if(!checkUser){
            return res.status(400).json({msg: "Invalid email and password"})
        }
        console.log(checkUser);
        
        let hashPassword = checkUser.password
        let checkPassword = await bcrypt.compare(password, hashPassword)
        if(!checkPassword){
            return res.status(400).json({msg: "Invalid password"})
        }
        res.status(200).json({msg: "User logged in successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

export default router