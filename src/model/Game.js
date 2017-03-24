/**
 * Created by WangYe on 3/20/17.
 */
const Sequelize = require("sequelize");
//const config  = require ("../config.js");

export const defg = (sequelize)=>{
    
    return sequelize.define('game', {
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
};

