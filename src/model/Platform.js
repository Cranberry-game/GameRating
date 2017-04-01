const Sequelize = require("sequelize");

export const defp = (sequelize)=>{

    return sequelize.define('platform', {
        Id: {
            type: Sequelize.BIGINT(50),
            autoIncrement: true,
            primaryKey: true
        },
        platformName: {
            type: Sequelize.ENUM('Xbox One', "Xbox 360", "PS3", "Mobile", 'Vita', 'PS4', 'Nintendo Switch', 'Wii U', 'PC'),
            allowNull: false
        }
    }, {
        timestamps: false
    });
};
