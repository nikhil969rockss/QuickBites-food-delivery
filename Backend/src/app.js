//library
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

//middlewares imports
import errorMiddleware from "./middlewares/error.middlerware.js";

//routes imports
import authRouter from "./routes/auth.route.js";

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

//routes

app.use("/api/auth", authRouter)


//error middleware
app.use(errorMiddleware);

export default app;
