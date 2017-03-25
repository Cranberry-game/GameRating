/**
 * Created by WangYe on 3/25/17.
 */
const Sequelize = require("sequelize");
const Game = require('./Game');
const GameList = require('./GameList');


export const defc =(sequelize) => {
    return sequelize.define('creation', {
    }, {
        timestamps: false
    });
};


