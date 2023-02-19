import express from "express";

const router = express.Router();

// 전체 조회
router.get("/", (req, res, next) => {});

// 단일 조회
router.get("/:id", (req, res, next) => {});

// 유저 트윗 조회
router.get("/my", (req, res, next) => {});

// 생성
router.post("/", (req, res, next) => {});

// 수정
router.put("/", (req, res, next) => {});

// 삭제
router.put("/:id", (req, res, next) => {});
