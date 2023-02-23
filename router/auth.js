import express from "express";
import { body, header } from "express-validator";

import * as authController from "../controller/auth.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

const validateAuth = {
	signup: [
		body("userName")
			.trim()
			.isLength({ min: 5 })
			.withMessage("`username`이 비어있습니다."),
		body("password")
			.trim()
			.isLength({ min: 5 })
			.withMessage("`pssword`가 비어있습니다."),
		body("email")
			.isEmail()
			.normalizeEmail()
			.withMessage("이메일 형식이 아닙니다."),
		body("name").notEmpty().withMessage("`name`이 비어있습니다."),
		body("url").isURL().withMessage("유효하지 않은 `URL`입니다.").optional({
			nullable: true,
			checkFalsy: true,
		}),
		validate,
	],
	login: [body("userName").notEmpty(), body("password").notEmpty(), validate],
	me: [header("Authentication").notEmpty(), validate],
};

router.post("/signup", validateAuth.signup, authController.signup);

router.post("/login", validateAuth.login, authController.login);

router.get("/me", validateAuth.me, authController.me);

export default router;
