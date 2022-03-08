const express = require('express');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const PORT = process.env.PORT || 5000;
const connectDB = require('./db');
const Upload = require('./models/uploadModel');
const csvtojson = require('csvtojson');


connectDB();
const app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.csv') 
    }
})



const upload = multer({
    storage:storage,
    limits: { fileSize: 10000000000 },
});

app.post('/upload',upload.single('file'),asyncHandler(async (req, res) => {
    const filePath=req.file.path;

    const jsonArray = await csvtojson().fromFile(filePath);
    console.log("JSON ARRAY ",jsonArray);
    const upload = await Upload.create({
        text: jsonArray,
    })

    res.status(200).json(jsonArray);
}));


app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
})
