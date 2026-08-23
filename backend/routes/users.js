import express from "express";
const router = express.Router();
// import { createUser } from "../controllers/users.js";
import controllers from "../controllers/users.js";
import auth from "../middlewares/auth.js";
import { validateSignup, validateSignin } from "../middlewares/validation.js";

router.post("/signup", validateSignup, controllers.createUser);
router.post("/signin", validateSignin, controllers.login);
router.get("/me", auth, controllers.getCurrentUser);

export default router;
