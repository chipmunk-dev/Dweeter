import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import tweetsRouter from "./router/tweetRouter.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { connectDB } from "./database/database.js";

const app = express();

const corsOption = {
	origin: config.cors.allowedOrigin,
	optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
	res.sendStatus(404);
});

app.use((error, req, res, next) => {
	console.error(error);
	res.sendStatus(500);
});

connectDB().then(db => {
	console.log("Connected Database...");
	const server = app.listen(config.port, () =>
		console.log("Connected Server...")
	);
	initSocket(server);
});
