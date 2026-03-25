import pino from "pino";

const logger = pino({
  level: "info",

  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            translateTime: "SYS:dd-mm-yy HH:MM:ss",
          },
        }
      : undefined,
});

export default logger;
