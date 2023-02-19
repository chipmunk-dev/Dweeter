import express from "express";

const router = express.Router();

let incereaseTweetId = 3;
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

// 1. 전체 조회
// 2. 유저 트윗 조회
router.get("/", (req, res, next) => {
	const { userName } = req.query;
	const data = userName ? tweets.filter(t => t.userName === userName) : tweets;

	res.status(200).json(data);
});

// 단일 조회
router.get("/:id", (req, res, next) => {
	const { id } = req.params;
	const tweet = tweets.find(tweet => tweet.id === parseInt(id));
	if (tweet) {
		return res.status(200).json(tweet);
	} else {
		return res.status(404).json({ message: `Tweet ${id} is not found` });
	}
});

// 생성
router.post("/", (req, res, next) => {
	const { text, name, userName, url } = req.body;
	if (text && name && userName) {
		const tweet = {
			id: incereaseTweetId++,
			text,
			createdAt: new Date(),
			name,
			userName,
			url: url || null,
		};
		tweets = [tweet, ...tweets];
		return res.sendStatus(201);
	}

	return res.status(400).send("text or name or userName is missing");
});

// 수정
router.put("/:id", (req, res, next) => {
	const { id } = req.params;
	const { text } = req.body;
	const tweet = tweets.find(t => t.id === parseInt(id));

	if (tweet) {
		tweet.text = text;
		return res.status(200).json(tweet);
	} else {
		return res.status(404).json({ message: `Tweet ${id} not found` });
	}
});

// 삭제
router.delete("/:id", (req, res, next) => {
	const { id } = req.params;
	if (!id) return res.status(400).send("missing id");
	tweets = tweets.filter(t => t.id !== parseInt(id));
	return res.sendStatus(204);
});

export default router;
