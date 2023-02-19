import express from "express";

const router = express.Router();

let incereaseTweetId = 3;
const tweets = [
	{
		id: 1,
		text: "안녕하세요?",
		createdAt: new Date().getDate(),
		name: "quokka",
		userName: "quokka54",
	},
	{
		id: 2,
		text: "친구 구합니다.",
		createdAt: new Date().getDate(),
		name: "chipmunk",
		userName: "dev_chip",
	},
];

// 전체 조회
router.get("/", (req, res, next) => {
	res.status(200).json(tweets);
});

// 유저 트윗 조회
router.get("/user", (req, res, next) => {
	const { userName } = req.query;

	if (!userName) {
		return res.status(400).send(`"userName" is missing`);
	}

	const tweetList = tweets.filter(tweet => tweet.userName === userName);

	if (tweetList.length) {
		return res.status(200).json(tweetList);
	} else {
		return res.status(400).send(`"${userName}" is not exist`);
	}
});

// 단일 조회
router.get("/:id", (req, res, next) => {
	const { id } = req.params;

	if (!id) return res.status(400).send(`"id" is missing`);

	const tweet = tweets.find(tweet => tweet.id === parseInt(id));

	if (tweet) {
		return res.status(200).json(tweet);
	} else {
		return res.status(400).send(`"${id}" is not exist`);
	}
});

// 생성
router.post("/", (req, res, next) => {
	const { text, name, userName, url } = req.body;

	if (text && name && userName) {
		const tweet = {
			id: incereaseTweetId,
			text,
			createdAt: new Date().getDate(),
			name,
			userName,
			url: url || null,
		};

		tweets.push(tweet);
		incereaseTweetId++;

		return res.sendStatus(201);
	}

	return res.status(400).send("text or name or userName is missing");
});

// 수정
router.put("/:id", (req, res, next) => {
	const { id } = req.params;
	const { text } = req.body;

	if (!id || !text) {
		return res.status(400).send(`missing "id" or "text" is empty data `);
	}

	let isFind = false;

	tweets.forEach(tweet => {
		if (tweet.id === parseInt(id)) {
			tweet.text = text;
			isFind = true;
		}
	});

	if (isFind) {
		return res.sendStatus(201);
	} else {
		return res.status(400).send(`${id} is not exist`);
	}
});

// 삭제
router.delete("/:id", (req, res, next) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400).send("missing id");
	}

	const findIndex = tweets.findIndex(tweet => tweet.id === parseInt(id));

	if (findIndex > -1) {
		tweets.splice(findIndex, 1);
		return res.sendStatus(204);
	} else {
		return res.status(400).send(`${id} is not exist`);
	}
});

export default router;
