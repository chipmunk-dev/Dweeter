import { ObjectId } from "mongodb";
import * as authRepository from "./auth.js";
import { getTweets } from "../database/database.js";

// 모든 트윗 조회
export async function getAll() {
	return await getTweets()
		.find()
		.sort({ createdAt: -1 })
		.toArray()
		.then(mapTweets);
}

// username이 같은 트윗 조회
export async function getAllByUserName(username) {
	return await getTweets()
		.find({ username })
		.sort({ createdAt: -1 })
		.toArray()
		.then(mapTweets);
}

// tweet id를 이용한 단일 조회
export async function getById(id) {
	return await getTweets()
		.findOne({ _id: new ObjectId(id) })
		.then(mapOptionalTweet);
}

// tweet 생성
export async function create(text, userId) {
	const { username, name, url } = await authRepository.findByUserId(userId);

	const tweet = {
		text,
		createdAt: new Date(),
		userId,
		username,
		name,
		url,
	};

	return await getTweets().insertOne(tweet).then(mapOptionalTweet);
}

// tweet 업데이트
export async function update(id, text) {
	return getTweets()
		.findOneAndUpdate(
			{ _id: new ObjectId(id) },
			{ $set: { text } },
			{ returnDocument: "after" }
		)
		.then(data => data.value)
		.then(mapOptionalTweet);
}

// tweet 삭제
export async function remove(id) {
	return getTweets().deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalTweet(tweet) {
	return tweet && { id: tweet._id.toString(), ...tweet };
}

function mapTweets(tweets) {
	return tweets.map(mapOptionalTweet);
}
