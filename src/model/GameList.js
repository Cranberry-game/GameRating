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
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT
}, {
    timestamps: false
});
};

