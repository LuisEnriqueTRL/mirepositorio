const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Products extends Model {}

Products.init({
    id_company: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Products',
    tableName: 'products',
    timestamps: true,
    paranoid: true
});

module.exports = Products;