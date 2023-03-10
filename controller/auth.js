import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as authRepository from "../data/auth.js";
import { config } from "../config.js";

function createJwtToken(id) {
	return jwt.sign({ id }, config.jwt.secretKey, {
		expiresIn: config.jwt.expiresInSec,
	});
}

// 회원가입
export async function signup(req, res) {
	const { username, password, email, name, url } = req.body;
	const user = await authRepository.findByUserName(username);

	if (user) {
		return res.status(409).json({ message: "이미 존재하는 유저입니다." });
	}

	const salt = await bcrypt.genSalt(parseInt(config.bcrypt.saltRounds));
	const hash = await bcrypt.hash(password, salt);
	const userId = await authRepository.create({
		username,
		password: hash,
		email,
		name,
		url,
	});
	const token = createJwtToken(userId);

	return res.status(201).json({ token, username });
}

// 로그인
export async function login(req, res) {
	const { username, password } = req.body;
	const user = await authRepository.findByUserName(username);
	if (!user) {
		return res
			.status(401)
			.json({ message: "아이디 혹은 비밀번호를 확인해주세요." });
	}

	const isValidPassword = await bcrypt.compare(password, user.password);

	if (!isValidPassword) {
		return res
			.status(401)
			.json({ message: "아이디 혹은 비밀번호를 확인해주세요." });
	}

	const token = createJwtToken(user.id);

	return res.status(200).json({ token, username }); // 동일 사이트에서만 쿠키 전송 가능
}

// 인증
export async function me(req, res) {
	const user = await authRepository.findByUserId(req.userId);

	if (!user) {
		return res.status(404).json({ message: "유저를 찾을 수 없습니다." });
	}

	return res.status(200).json({ token: req.token, username: user.username });
}
