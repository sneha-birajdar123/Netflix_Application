import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import adminModel from "../../models/Admins/Admins.js";

const router = express.Router()

router.get("/getalladmins", async(req, res) => {
    try {
        let allAdmins = await adminModel.find({})
        res.status(200).json(allAdmins)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})

router.get("/getone/:id", async(req, res) => {
    try {
        let adminId = req.params.id
        let getOne = await adminModel.findOne({_id: adminId})
        res.status(200).json(getOne)
    } catch (error) {
         console.log(error);
         res.status(500).json({msg: error})
    }
})

router.post("/register", async(req, res) => {
    try {
        let adminData = req.body
        let hashPassword = await bcrypt.hash(adminData.password, 10)
        adminData.password = hashPassword
        await adminModel.create(adminData)
        res.status(201).json({msg: "Admin added successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})

router.put("/update/:id", async(req, res) => {
    try {
        let adminId = req.params.id
        let adminData = req.body
        await adminModel.updateOne({_id: adminId}, {$set: adminData})
        res.status(200).json({msg: "Admin updated successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})

router.delete("/deleteone/:id", async(req, res) => {
    try {
        let adminId = req.params.id
        await adminModel.deleteOne({_id: adminId})
        res.status(200).json({msg: "Admin deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})

router.delete("/deleteall", async(req, res) => {
    try {
        let adminId = req.params.deleteall
        await adminModel.deleteMany()
        res.status(200).json({msg: "Deleted all admins"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})

export default router