import express from "express"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import videoModel from "../../models/Videos/Videos.js";

const router = express.Router()

router.get("/getallvideos", async (req, res) => {
    try {
        console.log("get all videos");
        let allVideos = await videoModel.find({})
        res.status(200).json(allVideos)

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})



router.get("/getone/:id", async (req, res) => {
    try {
        let videoId = req.params.id
        let getOne = await videoModel.find({ _id: videoId })
        res.status(200).json(getOne)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})



router.post("/register", async (req, res) => {
    try {
        let videoData = req.body
        await videoModel.create(videoData)
        res.status(201).json({ msg: "Video added successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})




router.put("/update/:id", async (req, res) => {
    try {
        let videoId = req.params.id
        let videoData = req.body
        await videoModel.updateOne({ _id: videoId }, { $set: videoData })
        res.status(200).json({ msg: "Video updated successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

router.delete("/deleteone/:id", async (req, res) => {
    try {

        let videoId = req.params.id
        await videoModel.deleteOne({ _id: videoId })
        console.log("delete video");
        res.status(200).json({ msg: "Video deleted successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})


router.delete("/deleteall", async (req, res) => {
    try {
        let videoId = req.params.deleteall
        await videoModel.deleteMany()
        res.status(200).json({ msg: "Deleted all videos" })
        console.log("delete all videos");

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

export default router