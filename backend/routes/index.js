import express from "express";

import users from "./users.js";
import reservations from "./reservation.js";

const router = express.Router();

router.use("/", users);
router.use("/", reservations);

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

export default router;
