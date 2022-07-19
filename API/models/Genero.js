const { Sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize) =>{

    sequelize.define('Genero',{
        
        id:{
            type: Sequelize.UUID,
            defaultvalue: Sequelize.UUIDV4,
            primaryKey: true
        },

        Nombre:{
            type: DataTypes.STRING,
            allowNull: false
        }

    })
};