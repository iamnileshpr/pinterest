const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pinterest");

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
    dp: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    FullName: {
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);