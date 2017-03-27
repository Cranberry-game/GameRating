const Sequelize = require("sequelize");

export const defp = (sequelize)=>{

    return sequelize.define('platform', {
        Id: {
            type: Sequelize.BIGINT(50),
            autoIncrement: true,
            primaryKey: true
        },
        platformName: {
            type: Sequelize.ENUM('Xbox One','PS4','Nintendo Switch','Wii U', 'PC'),
            allowNull: false
        }
    }, {
        timestamps: false
    });
};
