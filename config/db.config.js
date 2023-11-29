require('dotenv').config();
const Sequelize = require('sequelize');

const dbPort = 5432;
const dbName = 'foodie_db_pk5v';
const dbUser = 'foodie_db_pk5v_user';
const dbPassword = 'vyUoPAspxHBsfGfPkI1uxAtHje6D3JE1';
const dbHost = 'dpg-cljaepk4f62c73adhq10-a';


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
