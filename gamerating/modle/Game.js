/**
 * Created by WangYe on 3/20/17.
 */
const Sequelize = require("sequelize");
const config  = require ("../config.js");

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});



let Game = sequelize.define('game', {
    id: {
        type: Sequelize.BIGINT(50),
        autoIncrement: true,
        primaryKey: true
    },
    title: Sequelize.STRING(100),
    gameType: Sequelize.STRING(100),
    totalRate: Sequelize.BIGINT,
    price: Sequelize.STRING(100),
    releaseCompany: Sequelize.STRING(100),
    releaseDate: Sequelize.STRING(100),
    studio: Sequelize.STRING(100),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT
}, {
    timestamps: false
});

//Game.sync();

module.exports = Game;

