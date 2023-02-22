import express from "express";
import { body, header } from "express-validator";

import * as authController from "../controller/auth.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

const validateAuth = {
	signup: [
		body("userName").notEmpty(),
		body("password".notEmpty()),
		body("email").isEmail(),
		body("name").notEmpty(),
		validate,
	],
	login: [body("userName").notEmpty(), body("password".notEmpty()), validate],
	me: [header("Authentication").notEmpty(), validate],
};

router.post("/signup", validateAuth.signup, authController.signup);

router.post("/login", validateAuth.login, authController.login);

router.get("/me", validateAuth.me, authController.me);

export default router;
