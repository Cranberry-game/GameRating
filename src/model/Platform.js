/**
 * Created by WangYe on 3/20/17.
 */
const Sequelize = require("sequelize");

export const defp = (sequelize)=>{

    return sequelize.define('platform', {
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
};