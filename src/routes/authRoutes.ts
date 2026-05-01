import { Router } from "express";
import { userInsertSchema } from "../db/schema.ts";
import { validateBody } from "../middleware/validation.ts";

const router = Router();

router.post("/register", validateBody(userInsertSchema), (req, res) => {
	res.status(201).json({ message: "user sign up" });
});

router.post("/login", (req, res) => {
	res.status(201).json({ message: "user logged in" });
});

export default router;
