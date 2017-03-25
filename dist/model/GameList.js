"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by WangYe on 3/20/17.
 */var Sequelize = require("sequelize");

var defgl = exports.defgl = function defgl(sequelize) {
    return sequelize.define('gamelist', {
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
};