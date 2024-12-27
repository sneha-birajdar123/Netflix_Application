import express from "express";
import config from "config";

import "./utils/dbConnect.js"

import adminRouter from "./controllers/admin/index.js";
import trailerRouter from "./controllers/trailer/index.js";
import userRouter from "./controllers/user/index.js";
import videoRouter from "./controllers/video/index.js"

import publicRouter  from "./controllers/public/index.js"

const app = express()
const PORT = config.get("PORT")
app.use(express.json())

app.get("/", (req, res) => {
    try {
        res.status(200).json({msg: "Hello World"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})

app.use("/api/public", publicRouter)

app.use("/api/admin", adminRouter)
app.use("/api/trailer", trailerRouter);
app.use("/api/user", userRouter);
app.use("/api/video", videoRouter)

app.listen(PORT, () => {
    console.log(`server is up and running at ${PORT}`);
})