import express from "express";
import * as tweetController from "../controller/tweet.js";
const router = express.Router();

// 1. 전체 조회
// 2. 유저 트윗 조회
router.get("/", tweetController.getTweets);

// 단일 조회
router.get("/:id", tweetController.getTweet);

// 생성
router.post("/", tweetController.createTweet);

// 수정
router.put("/:id", tweetController.updateTweet);

// 삭제
router.delete("/:id", tweetController.deleteTweet);

export default router;
