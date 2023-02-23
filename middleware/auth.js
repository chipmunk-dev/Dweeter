import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.js";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
	const authHeader = req.get("Authorization");

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json(AUTH_ERROR);
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
		const user = await authRepository.findByUserId(decoded.id);

		if (!user) {
			return res.status(401).json(AUTH_ERROR);
		}

		req.userId = user.id; // custom attribute
		next();
	} catch (err) {
		return res.status(401).json(AUTH_ERROR);
	}
};
