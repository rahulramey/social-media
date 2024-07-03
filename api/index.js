const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users.js")
const authRoute = require("./routes/auth.js")
const postRoute = require("./routes/posts.js")

dotenv.config({})

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to MongoDB!");
})

//middleware
app.use(express.json());
app.use(helmet({crossOriginResourcePolicy: false}));
app.use(morgan());

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
// app.use(cors)

app.listen(process.env.PORT, ()=>{
    console.log("Backend server is running!")
})