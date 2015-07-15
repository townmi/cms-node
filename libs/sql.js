/**
 * @author [townmi]
 * @version [0.0.2]
 * @date  [2015-07-15]
 * @description [description]
 */

var mysql = require("mysql");
var Sequelize = require('sequelize');

var config = require("../config/config.js");

// 建立链接
var sequelize = new Sequelize('test', config.user, config.password, {
	host: config.host,
	dialect: 'mysql',
	port: config.port,
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

/**
 * [User 结构体]
 * @type {[type]}
 */

sequelize.sync();

var User = sequelize.define('User', 
	{
		name: {
			type: Sequelize.STRING(100),
			allowNull: false,
			comment: '用户姓名',
		},
		ip: {
			type: Sequelize.STRING(64),
			allowNull: false,
			comment: '用户上次请求IP',
		},
		isNpmUser: {
			field: 'user_npm',
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			comment: '1: true, other: false',
		}
	}, {
		tableName: 'user',
		comment: 'user 表详情',
		// 索引
		indexes: [
			{
				// 唯一索引
				unique: true,
				fields: ['name']
			},
			{
				fields: ['user_modified']
			}
		],
		createdAt: 'user_create',
		updatedAt: 'user_modified',
		charset: 'utf8',
		collate: 'utf8_general_ci',
	}
);

module.exports = {
	User: User
}