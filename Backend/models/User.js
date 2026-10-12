const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: 2,
        maxlength: 100,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
        select: false,
    },

    role: {
        type: String,
        enum: ["researcher", "participant"],
        default: "participant",
    },
},
    {
        timestamps: true
    },
);
module.exports = mongoose.model("User", userSchema)