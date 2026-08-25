import express from "express";

import users from "./users.js";
import reservations from "./reservation.js";

const router = express.Router();

router.use("/", users);
router.use("/", reservations);

export default router;
