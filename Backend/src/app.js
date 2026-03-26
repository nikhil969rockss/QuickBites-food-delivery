//library
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

//middlewares imports
import errorMiddleware from "./middlewares/error.middlerware.js";
import httpLogger from "./middlewares/logger.middleware.js";

//routes imports
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

// middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(httpLogger);

app.use(
  cors({
    origin: ["http://localhost:3000", "https://localhost:5173"],
    credentials: true,
  }),
);

//routes

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

//error middleware
app.use(errorMiddleware);

export default app;
