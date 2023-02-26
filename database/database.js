import MongoDB from "mongodb";
import { config } from "../config.js";

let db;
// 연결
export async function connectDB() {
	return MongoDB.MongoClient.connect(config.db.host) //
		.then(client => {
			db = client.db();
			return db;
		});
}

export function getUsers() {
	return db.collection("users");
}

export function getTweets() {
	return db.collection("tweets");
}