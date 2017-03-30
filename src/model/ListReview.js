const Sequelize = require("sequelize");

export const deflr = (sequelize)=>{

    return sequelize.define('listreview', {
        id: {
            type: Sequelize.BIGINT(50),
            autoIncrement: true,
            primaryKey: true
        },
        rate: Sequelize.FLOAT,
        content: Sequelize.STRING(500),
        createdAt: Sequelize.BIGINT,
        updatedAt: Sequelize.BIGINT
    }, {
        timestamps: false
    });
};
