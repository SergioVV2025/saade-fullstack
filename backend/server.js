import app from "./app.js";
import connectDB from "./utils/db.js";
import { PORT } from "./utils/config.js";

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
