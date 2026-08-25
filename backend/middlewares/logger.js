import winston from "winston";
import expressWinston from "express-winston";

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: "request.log",
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  headerBlacklist: ["authorization"],
});

const errorFileLogger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: "error.log",
    }),
  ],
});

const errorLogger = (err, req, res, next) => {
  errorFileLogger.error(err.message, {
    statusCode: err.statusCode || 500,
    method: req.method,
    url: req.originalUrl,
  });

  next(err);
};

export { requestLogger, errorLogger };
