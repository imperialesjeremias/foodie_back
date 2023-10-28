const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db.config');

    const User = sequelize.define(
        'users',
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false // no puede ser nula la columna
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            
        },
        {
            timestamps: true, // agrega automaticamente comlunas de creado y actualizado
        }
    );

module.exports = User;