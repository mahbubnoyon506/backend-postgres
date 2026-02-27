const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


const Result = sequelize.define('Result', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    grade: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    semester: {
        type: DataTypes.STRING,
    }
}, { timestamps: true })

module.exports = Result