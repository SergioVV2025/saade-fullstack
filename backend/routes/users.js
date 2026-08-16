import express from "express";
const router = express.Router();
// import { createUser } from "../controllers/users.js";
import controllers from "../controllers/users.js";

router.post("/signup", controllers.createUser);
router.post("/signin", controllers.login);

export default router;
