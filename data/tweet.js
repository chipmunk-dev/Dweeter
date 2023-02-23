import * as authRepository from "../data/auth.js";

let increaseId = 3;

let tweets = [
	{
		id: 1,
		text: "안녕하세요?",
		createdAt: Date.now().toString(),
		userId: 1,
	},
	{
		id: 2,
		text: "친구 구합니다.",
		createdAt: Date.now().toString(),
		userId: 2,
	},
];

export async function getAll() {
	return Promise.all(
		tweets.map(async tweet => {
			const { userName, name, url } = await authRepository.findByUserId(
				tweet.userId
			);

			return { ...tweet, userName, name, url };
		})
	);
}

export async function getAllByUserName(userName) {
	const tweets = await getAll();

	return tweets.filter(tweet => tweet.userName === userName);
}

export async function getById(id) {
	const tweet = tweets.find(tweet => tweet.id === parseInt(id));

	if (!tweet) return null;

	const { userName, name, url } = await authRepository.findByUserId(
		tweet.userId
	);

	return { ...tweet, userName, name, url };
}

export async function create(text, userId) {
	const tweet = {
		id: increaseId++,
		text,
		createdAt: new Date(),
		userId,
	};

	tweets = [tweet, ...tweets];
}

export async function update(id, text) {
	const tweet = tweets.find(t => t.id === parseInt(id));

	if (tweet) {
		tweet.text = text;
	}

	return tweet;
}

export async function remove(id) {
	tweets = tweets.filter(t => t.id !== parseInt(id));
}
