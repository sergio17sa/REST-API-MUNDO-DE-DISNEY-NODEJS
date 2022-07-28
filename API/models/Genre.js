const { Sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize) =>{

    sequelize.define('Genre',{
        
        id:{
            type: Sequelize.UUID,
            defaultvalue: Sequelize.UUIDV4,
            primaryKey: true
        },

        Name:{
            type: DataTypes.STRING,
            allowNull: false
        },

        Picture:{
            type: DataTypes.STRING,
            allowNull: false
        }

    })
};