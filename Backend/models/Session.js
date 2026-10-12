
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },

        condition: {
            type: String,
            enum: [
                "baseline",
                "easy_task",
                "difficult_task",
                "recovery",
            ],
            default: "baseline",
        },

        status: {
            type: String,
            enum: ["running", "completed", "failed"],
            default: "running",
        },

        dataSource: {
            type: String,
            enum: ["synthetic", "wearable", "webcam", "multimodal"],
            default: "synthetic",
        },

        startedAt: {
            type: Date,
            default: Date.now,
        },

        endedAt: {
            type: Date,
            default: null,
        },
        features: { type: Object },

        prediction: {
            state: String,
            label: String,
            probabilities: Object,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Session", sessionSchema);