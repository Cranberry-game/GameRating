/**
 * Created by WangYe on 3/20/17.
 */
<<<<<<< HEAD
=======

>>>>>>> origin/master
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

