let membersId = 2;
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

export async function findByUserId(userId) {
	return members.find(member => member.id === userId);
}

export async function findByUserName(userName) {
	return members.find(member => member.userName === userName);
}

export async function create({ userName, password, email, name, url }) {
	const user = { id: membersId++, userName, password, email, name, url };
	members.push(user);

	return user.id;
}
