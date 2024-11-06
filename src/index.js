import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT;

// connect to database
connectDB()
    .then(
        app.listen(PORT || 8000, () => {
            console.log("App listening on port: ", PORT);
        })
    )
    .catch((err) => {
        console.log("MongoDB Connection Error", err);
    });
