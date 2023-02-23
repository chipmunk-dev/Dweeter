import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as authRepository from "../data/auth.js";

// TODO: 환경변수로 빼기
const jwtSecretKey = "Quokkajeong";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 10;

function createJwtToken(id) {
	return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

export async function signup(req, res) {
	const { userName, password, email, name, url } = req.body;
	const user = await authRepository.findByUserName(userName);

	if (user) {
		return res.status(409).json({ message: "이미 존재하는 유저입니다." });
	}

	const salt = await bcrypt.genSalt(bcryptSaltRounds);
	const hash = await bcrypt.hash(password, salt);
	const userId = await authRepository.create({
		userName,
		password: hash,
		email,
		name,
		url,
	});
	const token = createJwtToken(userId);

	return res.status(201).json({ token, userName });
}

export async function login(req, res) {
	const { userName, password } = req.body;
	const user = await authRepository.findByUserName(userName);
	console.log(userName, password);
	if (!user) {
		return res
			.status(401)
			.json({ message: "아이디 혹은 비밀번호를 확인해주세요." });
	}
	console.log(user);

	const isValidPassword = await bcrypt.compare(password, user.password);

	if (!isValidPassword) {
		return res
			.status(401)
			.json({ message: "아이디 혹은 비밀번호를 확인해주세요." });
	}

	const token = createJwtToken(user.userId);

	return res.status(200).json({ token, userName }); // 동일 사이트에서만 쿠키 전송 가능
}

export async function me(req, res) {
	const authorization = req.header("Authorization");

	if (!authorization) return res.sendStatus(401);

	// TODO: Token 해싱
	try {
		const user = await jwt.verify(authorization, jwtSecretKey);
		const compareUser = await authRepository.findByUserName(user.userName);

		if (!compareUser)
			return res.status(401).json({ message: "잘못된 Token 값입니다." });

		const mappedUser = Object.assign({}, compareUser);
		delete mappedUser.password;

		return res.status(200).json({ user: mappedUser });
	} catch (err) {
		return res.status(401).json({ message: "잘못된 Token값 입니다." });
	}
}
