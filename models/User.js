const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que la ruta sea correcta

class User extends Model {}

User.init({
    id_company: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Asegúrate de que los nombres de usuario sean únicos
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User', // Nombre del modelo
    tableName: 'users', // Nombre de la tabla en la base de datos
    timestamps: true, // Para manejar createdAt y updatedAt
    paranoid: true, // Para manejar soft deletes (opcional)
});

module.exports = User;
