import { createPool } from "mysql2";
import { config } from "../../config.js";

const pool = createPool({
	host: config.db.host,
	user: config.db.user,
	database: config.db.database,
	password: config.db.password,
});

export const db = pool.promise();
