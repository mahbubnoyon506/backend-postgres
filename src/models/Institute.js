const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Institute = sequelize.define('Institute', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING
    }
}, { timestamps: true });

module.exports = Institute