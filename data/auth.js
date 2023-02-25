import { DataTypes } from "sequelize";
import { db, sequelize } from "../data/db/database.js";

const User = sequelize.define(
	"user",
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING(45),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		url: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
	},
	{ timestamps: false }
);

export async function findByUserName(username) {
	return User.findOne({ where: { username } });
}

export async function findByUserId(userId) {
	return User.findByPk(userId);
}

export async function create(user) {
	return User.create(user).then(data => data.dataValues.id);
}
