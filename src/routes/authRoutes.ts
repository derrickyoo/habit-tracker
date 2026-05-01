import { Router } from "express";
import z from "zod";
import { login, register } from "../controllers/authController.ts";
import { userInsertSchema } from "../db/schema.ts";
import { validateBody } from "../middleware/validation.ts";

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(1, "Password is required"),
});

const router = Router();

router.post("/register", validateBody(userInsertSchema), register);

router.post("/login", validateBody(loginSchema), login);

export default router;
