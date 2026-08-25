import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";

const PORT = process.env.PORT || 3001;

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/reservations";

const JWT_SECRET =
  process.env.JWT_SECRET || (!isProduction ? "dev-secret-key" : undefined);

if (isProduction && !process.env.MONGO_URL) {
  throw new Error("MONGO_URL debe estar definida en producción.");
}

if (isProduction && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET debe estar definida en producción.");
}

export { PORT, MONGO_URL, JWT_SECRET };
