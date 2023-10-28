const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db.config');

const plato = sequelize.define(
    'plato',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false // no puede ser nula la columna
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false, // timestamps false para que no agregue las columnas de created y updated 
    }
)

module.exports = {
    plato
};