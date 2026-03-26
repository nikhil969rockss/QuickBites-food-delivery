import pinoHttp from "pino-http";
import dotenv from "dotenv";

dotenv.config();

const httpLogger = pinoHttp({
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:dd-mm-yy HH:MM:ss",
          },
        }
      : undefined,
  redact: [
    "req.headers.authorization",
    "res.headers.authorization",
    "req.headers.cookie",
    "res.headers.cookie",
  ],
});
export default httpLogger;
