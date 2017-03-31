const Sequelize = require("sequelize");

export const defg = (sequelize)=>{
    
    return sequelize.define('game', {
    id: {
        type: Sequelize.BIGINT(50),
        autoIncrement: true,
        primaryKey: true
    },
    title: Sequelize.STRING(100),
    gameType: Sequelize.STRING(100),
    totalRate: Sequelize.FLOAT,
    price: Sequelize.STRING(100),
    releaseCompany: Sequelize.STRING(100),
    releaseDate: Sequelize.STRING(100),
    studio: Sequelize.STRING(100),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    cover: Sequelize.STRING(100),
    description: Sequelize.STRING(500),
    youtube: Sequelize.STRING(100),
}, {
    timestamps: false
});
};

