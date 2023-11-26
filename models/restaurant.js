const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db.config');
const { plato } = require('./platos');
const Comment = require('./comment.model');

const Restaurant = sequelize.define(
    'restaurant',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false // no puede ser nula la columna
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        schedule: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        averageRating: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
    },
    {
        timestamps: false, // timestamps false para que no agregue las columnas de created y updated 
    }
);

Restaurant.hasMany(plato, { as: 'platos', foreignKey: 'restaurantId' });
Restaurant.hasMany(Comment, { as: 'comments', foreignKey: 'restaurantId' });

module.exports = Restaurant;