let increaseId = 3;

let tweets = [
	{
		id: 1,
		text: "안녕하세요?",
		createdAt: Date.now().toString(),
		name: "quokka",
		userName: "quokka54",
	},
	{
		id: 2,
		text: "친구 구합니다.",
		createdAt: Date.now().toString(),
		name: "chipmunk",
		userName: "dev_chip",
	},
];

export async function getAll() {
	return tweets;
}

export async function getAllByUserName(userName) {
	return tweets.filter(tweet => tweet.userName === userName);
}

export async function getById(id) {
	return tweets.find(tweet => tweet.id === parseInt(id));
}

export async function create(text, name, userName, url) {
	const tweet = {
		id: increaseId++,
		text,
		createdAt: new Date(),
		name,
		userName,
		url: url || null,
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
