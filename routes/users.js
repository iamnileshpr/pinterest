var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();
var plm = require("passport-local-mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/pinterest")
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    dp: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    FullName: {
        type: String,
        required: true
    }
})



userSchema.plugin(plm)
module.exports = router;