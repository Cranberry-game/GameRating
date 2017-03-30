const Sequelize = require("sequelize");

export const defgl =(sequelize) => {
    return sequelize.define('gamelist', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    img: Sequelize.STRING(100),
    description: Sequelize.STRING(500),
    totalRate: Sequelize.FLOAT,
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT
}, {
    timestamps: false
});
};

