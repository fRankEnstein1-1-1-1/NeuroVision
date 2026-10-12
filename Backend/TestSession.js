
require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");
const Session = require("./models/Session");
const { generateFeatures, predictState } = require("./Services/AiServices");

const testSession = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("MongoDB connected");

        // Find an existing user
        const user = await User.findOne();

        if (!user) {
            console.log("No user found. Create a test user first.");
            return;
        }

        // Create a test session
        const session = await Session.create({
            user: user._id,
            condition: "difficult_task",
            dataSource: "synthetic",
        });

        // Retrieve the session with user details
        const savedSession = await Session.findById(session._id)
            .populate("user", "name email");

        //const features = generateFeatures(session.condition);
        const features = {
            heart_rate: 150,
            rmssd: 65,
            sdnn: 52,
            blink_rate: 34,
            eye_closure_pct: 3,
            head_movement: 1.3,
            rppg_hr: 73,
        };
        const prediction = await predictState(features);

        session.features = features;
        session.prediction = prediction;
        session.status = "completed";
        await session.save();

        const s = await Session.findById(session._id).populate("user", "name");

        console.log("Session ID       :", s._id.toString());
        console.log("User ID          :", s.user._id.toString());
        console.log("User Name        :", s.user.name);
        console.log("Condition        :", s.condition);
        console.log("Data Source      :", s.dataSource);
        console.log("\nSimulated Features\n------------------");
        console.log("Heart Rate       :", s.features.heart_rate, "BPM");
        console.log("RMSSD            :", s.features.rmssd, "ms");
        console.log("Blink Rate       :", s.features.blink_rate, "blinks/min");
        console.log("\nModel Prediction\n----------------");
        console.log("Estimated State  :", s.prediction.label);


    } catch (error) {
        console.error("Test failed:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

testSession();
