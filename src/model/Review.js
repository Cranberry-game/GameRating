/**
 * Created by WangYe on 3/20/17.
 */
const Sequelize = require("sequelize");

export const defr = (sequelize)=>{

    return sequelize.define('review', {
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
};