import * as tweetRepository from "../data/tweet.js";

export async function getTweets(req, res) {
	const { username } = req.query;
	const data = await (username
		? tweetRepository.getAllByUserName(username)
		: tweetRepository.getAll());

	res.status(200).json(data);
}

export async function getTweet(req, res) {
	const { id } = req.params;
	const tweet = await tweetRepository.getById(id);

	if (tweet) {
		return res.status(200).json(tweet);
	} else {
		return res.status(404).json({ message: `Tweet ${id} is not found` });
	}
}

export async function createTweet(req, res) {
	const { text } = req.body;

	if (!(text && req.userId)) {
		return res.status(400).send("text or name or username is missing");
	}

	const tweetId = await tweetRepository.create(text, req.userId);
	return res.status(201).json({ tweetId });
}

export async function updateTweet(req, res) {
	const { id } = req.params;
	const { text } = req.body;

	const tweet = await tweetRepository.getById(parseInt(id));
	if (!tweet)
		return res.status(404).json({ message: "존재하지 않는 트윗입니다." });

	if (parseInt(tweet.userId) !== parseInt(req.userId)) {
		return res.status(403).json({ message: "게시글 권한이 없습니다." });
	}

	const updatedTweetId = await tweetRepository.update(parseInt(id), text);

	if (updatedTweetId) {
		return res.status(200).json({ tweetId: updatedTweetId });
	} else {
		return res.status(404).json({ message: `Tweet ${id} not found` });
	}
}

export async function deleteTweet(req, res) {
	const { id } = req.params;
	if (!id) return res.status(400).send("missing id");

	const tweet = await tweetRepository.getById(id);

	if (!tweet)
		return res.status(404).json({ message: "존재하지 않는 트윗입니다." });

	if (parseInt(tweet.userId) !== parseInt(req.userId)) {
		return res.status(403).json({ message: "게시글 권한이 없습니다." });
	}

	await tweetRepository.remove(id);

	return res.sendStatus(204);
}
