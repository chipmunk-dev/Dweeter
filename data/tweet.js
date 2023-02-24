import { db } from "./db/database.js";

// 쿼리 변수
const TWEET_JOIN =
	"SELECT t.id, t.text, t.userId, t.createdAt, u.username, u.name, u.url FROM TWEETS as t JOIN users as u ON t.userid = u.id";
const ORDER_BY_CREATED_AT = "ORDER BY t.createdAt DESC";
// 트윗 조회 -> 전체 리스트
export async function getAll() {
	return db
		.execute(`${TWEET_JOIN} ${ORDER_BY_CREATED_AT}`)
		.then(result => result[0]);
}

// 트윗 조회 -> 유저가 작성한 트윗 리스트
export async function getAllByUserName(username) {
	return db
		.execute(`${TWEET_JOIN} WHERE u.username=? ${ORDER_BY_CREATED_AT}`, [
			username,
		])
		.then(result => result[0]);
}

// 트윗 조회 -> 단일 트윗 조회
export async function getById(id) {
	return db
		.execute(`${TWEET_JOIN} WHERE t.id=? ${ORDER_BY_CREATED_AT}`, [id])
		.then(result => result[0][0]);
}

// 트윗 생성
export async function create(text, userId) {
	return db
		.execute("INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)", [
			text,
			new Date(),
			userId,
		])
		.then(async result => await getById(result[0].insertId));
}

// 트윗 수정
export async function update(id, text) {
	return db
		.execute("UPDATE tweets SET text=? WHERE id=?", [text, id])
		.then(async () => await getById(id));
}

// 트윗 삭제
export async function remove(id) {
	return db.execute("DELETE FROM tweets WHERE id=?", [id]);
}
