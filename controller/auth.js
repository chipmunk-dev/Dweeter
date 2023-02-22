import * as authRepository from "../data/auth.js";

export async function signup(req, res) {
	const { userName, password, email, name, url } = req;

	await authRepository.create(userName, password, email, name, url);
	return res.sendStatus(201);
}

export async function login(req, res) {
	const { userName, password } = req;

	const user = await authRepository.login(userName, password);

	// TODO: Token 생성하여 cookie에 전달
	return res.sendStatus(200);
}

export async function me(req, res) {
	const authentication = req.header("Authentication");

	try {
		await authRepository.me(authentication);
		return res.status(200).json();
	} catch (error) {
		console.error(error);
		return res.status(403);
	}
}
