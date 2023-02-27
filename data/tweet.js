import mongoose from "mongoose";
import { useVirtualId } from "../database/database.js";
import * as authRepository from "./auth.js";

const tweetSchema = new mongoose.Schema(
	{
		text: { type: String, required: true },
		userId: { type: String, required: true },
		username: { type: String, required: true },
		name: { type: String, required: true },
		url: String,
	},
	{ timestamps: true }
);

useVirtualId(tweetSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

// 모든 트윗 조회
export async function getAll() {
	return Tweet.find().sort({ createdAt: -1 });
}

// username이 같은 트윗 조회
export async function getAllByUserName(username) {
	return Tweet.find({ username }).sort({ createdAt: -1 });
}

// tweet id를 이용한 단일 조회
export async function getById(id) {
	return Tweet.findById(id);
}

// tweet 생성
export async function create(text, userId) {
	const { username, name, url } = await authRepository.findByUserId(userId);
	return new Tweet({ text, userId, username, name }).save();
}

// tweet 업데이트
export async function update(id, text) {
	return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

// tweet 삭제
export async function remove(id) {
	return Tweet.findByIdAndDelete(id);
}
