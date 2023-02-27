import mongoose from "mongoose";
import { config } from "../config.js";

export async function connectDB() {
	mongoose.set("strictQuery", false);
	return mongoose.connect(config.db.host);
}

export function useVirtualId(schema) {
	// INFO: _id -> id
	schema.virtual("id").get(function () {
		return this._id.toString();
	});
	schema.set("toJSON", { virtuals: true });
	schema.set("toObject", { virtuals: true });
}

// TODO: Delete blow

let db;

export function getTweets() {
	return db.collection("tweets");
}
