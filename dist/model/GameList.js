"use strict";

/**
 * Created by WangYe on 3/20/17.
 */
var Sequelize = require("sequelize");
var config = require("../config.js");

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var GameList = sequelize.define('gamelist', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    img: Sequelize.STRING(100),
    creatorId: Sequelize.BIGINT,
    gameId: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT
}, {
    timestamps: false
});

//GameList.sync();

module.exports = GameList;