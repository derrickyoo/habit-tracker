import type { Request, Response, NextFunction } from "express";
import { verifyToken, type JwtPayload } from "../utils/jwt.ts";

export interface AuthenticateRequest extends Request {
	user?: JwtPayload;
}

export const authenticateToken = async (
	req: AuthenticateRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const authHeader = req.get("Authorization");
		const token = authHeader && authHeader.split("_")[1];

		if (!token) {
			return res.status(401).json({ error: "Bad Request" });
		}

		const payload = await verifyToken(token);
		req.user = payload;
		next();
	} catch (err) {
		return res.status(403).json({ error: "Forbidden" });
	}
};
