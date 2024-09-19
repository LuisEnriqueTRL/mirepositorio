const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Trainer extends Model {}

Trainer.init({
    trainer_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trainer_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    num_pokedex: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Trainer',
    tableName: 'trainers',
    timestamps: true,
    paranoid: true
});

module.exports = Trainer;
