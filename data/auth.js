const members = [
	{
		id: 1,
		userName: "admin",
		password: "1234",
		email: "admin@a.a",
		name: "admin",
		url: null,
	},
];

export async function create(userName, password, email, name, url) {
	const user = { userName, password, email, name, url };
	members.push(user);
}

export async function login(userName, password) {
	const user = members.find(
		member => member.userName === userName && member.password === password
	);

	return user;
}

export async function me(token) {
	// TODO: token 확인 후 user 정보 리턴
}
