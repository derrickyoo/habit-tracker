import { SignJWT, type JWTPayload } from "jose";
import { createSecretKey } from "node:crypto";
import env from "../../env.ts";

export interface JwtPayload extends JWTPayload {
	id: string;
	email: string;
	username: string;
}

const SECRET_KEY = createSecretKey(env.JWT_SECRET, "utf-8");
const EXPIRES_IN = env.JWT_EXPIRES_IN ?? "15m";

export const generateToken = (payload: JwtPayload) => {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(EXPIRES_IN)
		.sign(SECRET_KEY);
};
