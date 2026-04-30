import { Router } from "express";
import { z } from "zod";
import { validateBody } from "../middleware/validation.ts";

const habitInsertSchema = z.object({
	name: z.string(),
});

const router = Router();

router.get("/", (req, res) => {
	res.json({ message: "habits" });
});

router.get("/:id", (req, res) => {
	res.json({ message: "retrieved habit" });
});

router.post("/", [validateBody(habitInsertSchema)], (req, res) => {
	res.json({ message: "created habit" });
});

router.delete("/:id", (req, res) => {
	res.json({ message: "deleted habit" });
});

router.post("/:id/complete", (req, res) => {
	res.json({ message: "completed habit" });
});

export default router;
