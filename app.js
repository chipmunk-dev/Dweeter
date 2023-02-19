import express from "express";

const app = express();

app.use(express.json());

app.use("/tweets", tweetRouter);

app.listen(8080, () => console.log("Connected..."));
