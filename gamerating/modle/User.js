/**
 * Created by WangYe on 3/20/17.
 */
const Sequelize = require("sequelize");
const config  = require ("../config.js");

let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

let User = sequelize.define('user', {
    id: {
        type: Sequelize.BIGINT(50),
        autoIncrement: true,
        primaryKey: true
    },
    email: Sequelize.STRING(100),
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

//User.sync();

module.exports = User;