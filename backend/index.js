const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();

// app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:3000",  // Allow frontend URL
    credentials: true  // 
}))
// app.use(express.json())
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser())
app.use("/api", router)

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("connect to DB")
        console.log("Server is running ")
    })

})

