const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Companies extends Model {}

Companies.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gire: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direction: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    long: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Companies',
    tableName: 'companies',
    timestamps: true,
    paranoid: true
});

module.exports = Companies;