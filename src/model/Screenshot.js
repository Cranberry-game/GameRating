const Sequelize = require("sequelize");

export const defs = (sequelize)=>{

    return sequelize.define('screenshot', {
        Id: {
            type: Sequelize.BIGINT(50),
            autoIncrement: true,
            primaryKey: true
        },
        img: Sequelize.STRING(1000)
    }, {
        timestamps: false
    });
};
