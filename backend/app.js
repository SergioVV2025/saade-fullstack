import express from "express";
import cors from "cors";

import routes from "./routes/index.js";

import errorHandler from "./middlewares/errorHandler.js";
import { requestLogger, errorLogger } from "./middlewares/logger.js";

import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use("/", routes);

app.use(errorLogger);
app.use(errorHandler);

export default app;
