
const { Sequelize, DataTypes } = require('sequelize');

/* *|CURSOR_MARCADOR|* */
module.exports = (sequelize) => {
    sequelize.define('Characters', {

        id: {
            type: Sequelize.UUID,
            defaultvalue: Sequelize.UUIDV4,
            primaryKey: true
        },

       
        Picture: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        Weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },


        History: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        

    });
};