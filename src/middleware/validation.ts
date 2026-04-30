import type { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export const validateBody = (schema: ZodType<any>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const validateBody = schema.parse(req.body);
			req.body = validateBody;

			next();
		} catch (err) {
			if (err instanceof ZodError) {
				return res.status(400).json({
					error: "Validation failed",
					details: err.issues.map((e) => ({
						field: e.path.join("."),
						message: e.message,
					})),
				});
			}

			next(err);
		}
	};
};
