import { Router } from "express";
import { register } from "../controllers/authController.ts";
import { userInsertSchema } from "../db/schema.ts";
import { validateBody } from "../middleware/validation.ts";

const router = Router();

router.post("/register", validateBody(userInsertSchema), register);

router.post("/login", (req, res) => {
	res.status(201).json({ message: "user logged in" });
});

export default router;
