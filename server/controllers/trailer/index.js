import express from "express"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import trailerModel from "../../models/Trailers/Trailer.js"

const router = express.Router()

router.get("/getalltrailers", async (req, res) => {
    try {
        console.log("get all trailers");
        let allTrailers = await trailerModel.find({})
        res.status(200).json(allTrailers)

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})



router.get("/getone/:id", async (req, res) => {
    try {
        let trailerId = req.params.id
        let getOne = await trailerModel.find({ _id: trailerId })
        res.status(200).json(getOne)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})



router.post("/register", async (req, res) => {
    try {
        let trailerData = req.body
        await trailerModel.create(trailerData)
        res.status(201).json({ msg: "Trailer added successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})




router.put("/update/:id", async (req, res) => {
    try {
        let trailerId = req.params.id
        let trailerData = req.body
        await trailerModel.updateOne({ _id: trailerId }, { $set: trailerData })
        res.status(200).json({ msg: "Trailer updated successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

router.delete("/deleteone/:id", async (req, res) => {
    try {

        let trailerId = req.params.id
        await trailerModel.deleteOne({ _id: trailerId })
        console.log("delete Trailer");
        res.status(200).json({ msg: "Trailer deleted successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})





router.delete("/deleteall", async (req, res) => {
    try {
        let trailerId = req.params.deleteall
        await trailerModel.deleteMany()
        res.status(200).json({ msg: "Deleted all Trailers" })
        console.log("delete all Trailers");

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

export default router