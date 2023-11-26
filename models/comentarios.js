const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const comentario = sequelize.define(
  "comentario",
  {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false, // no puede ser nula la columna
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false, // timestamps false para que no agregue las columnas de created y updated
  }
);

module.exports = {
  comentario,
};
