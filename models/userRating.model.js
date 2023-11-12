const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const UserRating = sequelize.define(
    'user_rating',
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
});

const User = require('./user.model');
const Restaurant = require('./restaurant');

UserRating.belongsTo(User, { as: 'users', foreignKey: 'userId' });
UserRating.belongsTo(Restaurant, { as: 'restaurant', foreignKey: 'restaurantId' });

module.exports = UserRating;