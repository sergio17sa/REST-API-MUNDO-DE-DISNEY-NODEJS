/* Creating a table called Genre with the following columns: id, Name, and Picture. */
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