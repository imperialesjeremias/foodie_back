const Sequelize = require('sequelize');

const dbPort = 3306;
const dbName = 'foodie_db_test';
const dbUser = 'root';
const dbPassword = '2215379448Ji';
const dbHost = 'localhost';


const sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword, {
    dbHost,
    dbPort,
    dialect: 'mysql',
});

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {
    dbConnection,
    sequelize,
}