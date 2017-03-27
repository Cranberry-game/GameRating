const Sequelize = require("sequelize");

export const defu = (sequelize)=>{

    return sequelize.define('user', {
        id: {
            type: Sequelize.BIGINT(50),
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING(100),
            unique: true
        },
        name: Sequelize.STRING(100),
        password: Sequelize.STRING(100),
        isAdmin: Sequelize.BOOLEAN,
        isVerified: Sequelize.BOOLEAN,
        avatar: Sequelize.STRING(100),
        age: Sequelize.BIGINT,
        address: Sequelize.STRING(100),
        phone: Sequelize.STRING(100),
        createdAt: Sequelize.BIGINT,
        updatedAt: Sequelize.BIGINT
    }, {
        timestamps: false
    });
};