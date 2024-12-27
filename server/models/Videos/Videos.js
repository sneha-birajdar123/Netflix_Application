import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: false
    },
    language: {
        type: String,
        required: true
    },
    thumbNailUrl: {
        type: String,
        required: true,
        unique: true
    }
})

const videoModel = mongoose.model("Videos", videoSchema, "videos")
export default videoModel