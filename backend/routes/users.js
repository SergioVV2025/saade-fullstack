import express from "express";
const router = express.Router();
// import { createUser } from "../controllers/users.js";
import controllers from "../controllers/users.js";
import auth from "../middlewares/auth.js";

router.post("/signup", controllers.createUser);
router.post("/signin", controllers.login);
router.get("/me", auth, controllers.getCurrentUser);

export default router;
