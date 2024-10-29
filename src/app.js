import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cookieParser());

app.get("/", (req, res) => {
    return res.send("HELLO WORLD");
});

export { app };
