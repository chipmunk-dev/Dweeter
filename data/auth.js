import mongoose from "mongoose";
import { useVirtualId } from "../database/database.js";

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	url: String,
});

useVirtualId(userSchema);
const User = mongoose.model("User", userSchema);

export async function findByUserName(username) {
	return User.findOne({ username });
}

export async function findByUserId(userId) {
	return User.findById(userId);
}

export async function create(user) {
	return new User(user).save().then(data => data.id);
}
