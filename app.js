import express from "express";
import morgan from "morgan";

import tweetRouter from "./router/tweetRouter.js";

const app = express();

app.use(express.json());
app.use(morgan("short"));

app.use("/tweets", tweetRouter);

app.listen(8080, () => console.log("Connected..."));
