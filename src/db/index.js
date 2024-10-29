import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.DATABASE_URL}/${DB_NAME}`
        );
        console.log(
            "MongoDB Connected || DB Host",
            connectionInstance.connection.host,
            "\nPORT -> ",
            connectionInstance.connection.port
        );
    } catch (error) {
        console.log("MongoDB Connection Failed", error);
        process.exit(1);
    }
};

export default connectDB;
