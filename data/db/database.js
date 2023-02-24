import { createPool } from "mysql2";
import { config } from "../../config";

export const pool = createPool({
	host: config.db.host,
	user: config.db.user,
	database: config.db.database,
	password: config.db.password,
});
