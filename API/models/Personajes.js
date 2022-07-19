
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Personajes', {

        id: {
            type: Sequelize.UUID,
            defaultvalue: Sequelize.UUIDV4,
            primaryKey: true
        },

        Imagen: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Edad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        Peso: {
            type: DataTypes.INTEGER,
            allowNull: false
        },


        Historia: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    });
};