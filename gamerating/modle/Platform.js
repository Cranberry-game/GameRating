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



let Platform = sequelize.define('platform', {
    gameId: {
        type: Sequelize.BIGINT(50),
        primaryKey: true
    },
    platformName: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT
}, {
    timestamps: false
});

//Platform.sync();

module.exports = Platform;