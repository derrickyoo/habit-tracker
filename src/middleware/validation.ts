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
					error: "Invalid Body",
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

export const validateParams = (schema: ZodType<any>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.params);
			next();
		} catch (err) {
			if (err instanceof ZodError) {
				return res.status(400).json({
					error: "Invalid params",
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

export const validateQuery = (schema: ZodType<any>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.query);
			next();
		} catch (err) {
			if (err instanceof ZodError) {
				return res.status(400).json({
					error: "Invalid query",
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
