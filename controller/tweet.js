import * as tweetRepository from "../data/tweet.js";

export async function getTweets(req, res) {
	const { userName } = req.query;
	const data = await (userName ? tweetRepository.getAllByUserName(userName) : tweetRepository.getAll());

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
	const { text, name, userName, url } = req.body;

	if (text && name && userName) {
		await tweetRepository.create(text, name, userName, url);
		return res.sendStatus(201);
	}

	return res.status(400).send("text or name or userName is missing");
}

export async function updateTweet(req, res) {
	const { id } = req.params;
	const { text } = req.body;
	const tweet = await tweetRepository.update(id, text);

	if (tweet) {
		return res.status(200).json(tweet);
	} else {
		return res.status(404).json({ message: `Tweet ${id} not found` });
	}
}

export async function deleteTweet(req, res) {
	const { id } = req.params;
	if (!id) return res.status(400).send("missing id");
	await tweetRepository.remove(id);

	return res.sendStatus(204);
}
