import express from "express";
const router = express.Router();
// import { createUser } from "../controllers/users.js";
import controllers from "../controllers/users.js";
import auth from "../middlewares/auth.js";
import { validateSignup, validateSignin } from "../middlewares/validation.js";
import { loginLimiter, signupLimiter } from "../middlewares/rateLimiter.js";

router.post("/signup", signupLimiter, validateSignup, controllers.createUser);
router.post("/signin", loginLimiter, validateSignin, controllers.login);
router.get("/me", auth, controllers.getCurrentUser);

export default router;
