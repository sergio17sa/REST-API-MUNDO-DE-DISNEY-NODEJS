const { Sequelize, DataTypes } = require('sequelize');


/* A function that is being exported. */
module.exports = (sequelize) => {
    sequelize.define('Movies', {

        id: {
            type: Sequelize.UUID,
            defaultvalue: Sequelize.UUIDV4,
            primaryKey: true
        },


        Picture: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        CreateDate: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        }

    })
};