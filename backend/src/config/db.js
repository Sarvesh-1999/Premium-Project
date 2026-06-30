import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDb connected ✅");
    } catch (error) {
        console.log("Failed to connect MongoDb ❌");
        process.exit(1);
    }
 }

export default connectDb;