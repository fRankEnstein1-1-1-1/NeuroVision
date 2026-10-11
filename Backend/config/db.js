const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Mongo Connected !");
    }
    catch (error) {
        console.log("cant connect to mongo" + error)
    }
}
module.exports = connectDB
