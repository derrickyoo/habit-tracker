import type { Request, Response } from "express";
import db from "../db/connection.ts";
import { users, type NewUser } from "../db/schema.ts";
import { hashPassword } from "../utils/passwords.ts";
import { generateToken } from "../utils/jwt.ts";

export const register = async (
	req: Request<any, any, NewUser>,
	res: Response,
) => {
	try {
		const { password, ...delegated } = req.body;
		const hashedPassword = await hashPassword(password);

		const [user] = await db
			.insert(users)
			.values({
				...delegated,
				password: hashedPassword,
			})
			.returning({
				id: users.id,
				email: users.email,
				username: users.firstName,
				firstName: users.lastName,
				createdAt: users.createdAt,
			});

		const token = await generateToken({
			id: user.id,
			email: user.email,
			username: user.username,
		});

		return res.status(201).json({
			message: "User created",
			user,
			token,
		});
	} catch (err) {
		console.error("Registration error", err);
		res.status(500).json({ error: "Failed to create user" });
	}
};
