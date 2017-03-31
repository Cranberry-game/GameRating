const Sequelize = require("sequelize");

export const defs = (sequelize)=>{

    return sequelize.define('screenshot', {
        Id: {
            type: Sequelize.BIGINT(50),
            autoIncrement: true,
            primaryKey: true
        },
        img: Sequelize.STRING(100)
    }, {
        timestamps: false
    });
};
