/**
 * Created by WangYe on 3/20/17.
 */
const Sequelize = require("sequelize");

export const defp = (sequelize)=>{

    return sequelize.define('platform', {
        Id: {
            type: Sequelize.BIGINT(50),
            primaryKey: true
        },
        platformName: Sequelize.ENUM('Xbox One','PS4','Nintendo Switch','Wii U', 'PC'),
    }, {
        timestamps: false
    });
};
