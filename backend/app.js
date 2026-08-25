import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import { requestLogger, errorLogger } from "./middlewares/logger.js";
import { NotFoundError } from "./errors/index.js";

const app = express();

app.set("trust proxy", 1);

// app.use((req, res, next) => {
//   console.log("req.ip:", req.ip);
//   console.log("req.ips:", req.ips);
//   next();
// });

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use("/", routes);

// Si llegamos hasta aquí, ninguna ruta respondió
app.use((req, res, next) => {
  next(new NotFoundError("Recurso solicitado no encontrado."));
});

app.use(errorLogger);
app.use(errorHandler);

export default app;
