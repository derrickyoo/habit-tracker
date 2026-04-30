import { Router } from "express";
import { z } from "zod";
import { validateBody, validateParams } from "../middleware/validation.ts";

const habitInsertSchema = z.object({
	name: z.string(),
});

const habitUpdateParamsSchema = z.object({
	id: z.string(),
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

router.patch(
	"/:id",
	[validateParams(habitUpdateParamsSchema), validateBody(habitInsertSchema)],
	(req, res) => {
		res.json({ message: "deleted habit" });
	},
);

router.delete("/:id", (req, res) => {
	res.json({ message: "deleted habit" });
});

router.post("/:id/complete", (req, res) => {
	res.json({ message: "completed habit" });
});

export default router;
