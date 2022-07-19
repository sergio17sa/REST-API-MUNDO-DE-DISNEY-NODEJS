const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Peliculas', {

        id: {
            type: Sequelize.UUID,
            defaultvalue: Sequelize.UUIDV4,
            primaryKey: true
        },

        Imagen: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Título: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Fecha_de_creación: {
            type: DataTypes.STRING,
            allowNull: false
        },

        Calificación: {
            type: DataTypes.INTEGER,
            allowNull: true
        }

    })
};