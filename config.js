import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
	const value = process.env[key] || defaultValue;

	if (value == null) {
		throw new Error(`Key ${key} is undefined`);
	}

	return value;
}

export const config = {
	jwt: {
		secretKey: required("JWT_SECRET"),
		expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 87400)),
	},
	bcrypt: {
		saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10)),
	},
	db: {
		host: required("DB_HOST"),
	},
	port: parseInt(required("PORT", 8080)),
	cors: {
		allowedOrigin: required("CORS_ALLOW_ORIGIN"),
	},
};
