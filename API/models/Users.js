const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Users', {

        id: {
            type: Sequelize.UUID,
            defaultvalue: Sequelize.UUIDV4,
            primaryKey: true
        },

        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
};