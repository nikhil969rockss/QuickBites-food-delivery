//library
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import httpLogger from "./middlewares/logger.middleware.js";

dotenv.config();

//middlewares imports
import errorMiddleware from "./middlewares/error.middlerware.js";

//routes imports
import authRouter from "./routes/auth.route.js";

const app = express();

// middleware
app.use(helmet());
app.use(httpLogger);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3001", "https://localhost:5173"],
    credentials: true,
  }),
);

//routes

app.use("/api/auth", authRouter);

//error middleware
app.use(errorMiddleware);

export default app;
