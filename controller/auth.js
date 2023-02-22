import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import * as authRepository from "../data/auth.js";

const privateKey = "Quokkajeong";

export async function signup(req, res) {
	const { userName, password, email, name, url } = req.body;

	// TODO: 유저가 있는지 체크
	const user = authRepository.findByUserName(userName);
	if (user) {
		return res.status(409).json({ message: "이미 존재하는 유저입니다." });
	}

	// TODO: 비밀번호 암호화
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, 10);

	await authRepository.create(userName, hash, email, name, url);

	return res.status(201).json({ message: "회원가입이 완료되었습니다." });
}

export async function login(req, res) {
	const { userName, password } = req.body;

	const user = await authRepository.findByUserName(userName);

	if (!user) {
		return res.status(400).json({ message: "아이디가 존재하지 않습니다." });
	}

	const isSame = await bcrypt.compare(password, user.password);

	if (isSame) {
		// TODO: JWT 토큰 생성 및 cookie에 저장
		const mappedUserInfo = Object.assign({}, user);
		delete mappedUserInfo.password;
		const token = await jwt.sign(mappedUserInfo, privateKey, {
			algorithm: "RS256",
		});

		return res
			.cookie("Authentication", token, {
				httpOnly: true, // JavaScript에서 쿠키 접근 불가능
				secure: true, // HTTPS만 쿠키 전송 가능
				// sameSite: true -> 이건 같은 도메인에서 쿠키사용을 허용함
			})
			.sendStatus(200); // 동일 사이트에서만 쿠키 전송 가능
	}

	return res.status(400).json({ message: "비밀번호가 틀렸습니다." });
}

export async function me(req, res) {
	const authentication = req.header("Authentication");

	// TODO: Token 해싱

	try {
		await authRepository.me(authentication);
		return res.status(200).json();
	} catch (error) {
		console.error(error);
		return res.status(403);
	}
}
