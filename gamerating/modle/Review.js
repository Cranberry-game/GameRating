/**
 * Created by WangYe on 3/20/17.
 */
const Sequelize = require("sequelize");
const config  = require ("../config.js");

let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

let Review = sequelize.define('review', {
    id: {
        type: Sequelize.BIGINT(50),
        autoIncrement: true,
        primaryKey: true
    },
    userId: Sequelize.BIGINT(100),
    gameId: Sequelize.BIGINT(100),
    rate: Sequelize.BIGINT,
    content: Sequelize.STRING(100),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT
}, {
    timestamps: false
});

//Review.sync();

module.exports = Review;