import mongoose from "mongoose"

const trailerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        required: false
    },
    length: {
        type: String,
        required: false
    },
    width: {
        type: String,
        required: false
    },
    ownerId: {
        type: String,
        required: true
    }
})

const trailerModel = mongoose.model("Trailers", trailerSchema, "trailers")
export default trailerModel