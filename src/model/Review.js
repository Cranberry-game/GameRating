const Sequelize = require("sequelize");

export const defr = (sequelize)=>{

    return sequelize.define('review', {
        id: {
            type: Sequelize.BIGINT(50),
            autoIncrement: true,
            primaryKey: true
        },
        rate: Sequelize.FLOAT,
        content: Sequelize.STRING,
        createdAt: Sequelize.BIGINT,
        updatedAt: Sequelize.BIGINT
    }, {
        timestamps: false
    });
};
