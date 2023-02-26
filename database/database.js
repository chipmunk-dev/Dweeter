import MongoDB from "mongodb";
import { config } from "../config.js";

export async function connectDB() {
	return await MongoDB.MongoClient.connect(config.db.host) //
		.then(client => client.db());
}
