
require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");

const createRandomUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("MongoDB connected");

        const randomId = Math.random().toString(36).substring(2, 5);

        const userData = {
            name: `Test User ${randomId}`,
            email: `test_${randomId}@example.com`,
            password: "TestPass123!",
            role: "participant",
        };

        const user = await User.create(userData);

        console.log("\n========== USER CREATED ==========");
        console.log("User ID:", user._id);
        console.log("Name:", user.name);
        console.log("Email:", user.email);
        console.log("Role:", user.role);
        console.log("==================================\n");
    } catch (error) {
        console.error("Failed to create user:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

createRandomUser();