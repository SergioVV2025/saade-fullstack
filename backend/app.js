import express from "express";
import cors from "cors";

import routes from "./routes/index.js";

import errorHandler from "./middlewares/errorHandler.js";
import { requestLogger, errorLogger } from "./middlewares/logger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use("/", routes);

app.use(errorLogger);
app.use(errorHandler);

export default app;
