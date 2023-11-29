require('dotenv').config();
const Sequelize = require('sequelize');

const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;


const sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword, {
    dbHost,
    dbPort,
    dialect: 'postgres',
    define: {
        timestamps: false, // Para evitar la creación de columnas de fecha automática
        freezeTableName: true, // Para evitar la pluralización de nombres de tablas
    }
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
