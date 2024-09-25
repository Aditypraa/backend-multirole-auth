import express from "express";
import { signin, signout, getSession } from "../controllers/authController.js";

const router = express.Router();

router.get("/me", getSession);
router.post("/signin", signin);
router.delete("/signout", signout);

export default router;
