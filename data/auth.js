import { db } from "../data/db/database.js";

export async function findByUserId(userId) {
	return db
		.execute(`SELECT * FROM users WHERE id=?`, [userId])
		.then(result => result[0][0]);
}

export async function findByUserName(username) {
	return db
		.execute(`SELECT * FROM users WHERE username=?`, [username])
		.then(result => result[0][0]);
}

export async function create({ username, password, name, email, url }) {
	return db
		.execute(
			"INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)",
			[username, password, name, email, url]
		)
		.then(result => {
			return result;
		});
}
