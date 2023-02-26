import { ObjectId } from "mongodb";
import { getUsers } from "../database/database.js";

export async function findByUserName(username) {
	return getUsers() //
		.findOne({ username }) //
		.then(mapOptionalUser);
}

export async function findByUserId(userId) {
	return getUsers()
		.findOne({ _id: new ObjectId(userId) })
		.then(mapOptionalUser);
}

export async function create(user) {
	return getUsers()
		.insertOne(user)
		.then(data => data.insertedId.toString());
}

function mapOptionalUser(user) {
	return user && { ...user, id: user._id };
}
