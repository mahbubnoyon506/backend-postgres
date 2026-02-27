const sequelize = require("../config/db");
const Course = require("./Course");
const Institute = require("./Institute");
const Result = require("./Result");
const Student = require("./Student");
const User = require("./User");



Institute.hasMany(Student, { foreignKey: 'instituteId', onDelete: 'CASCADE' })
Student.belongsTo(Institute, { foreignKey: 'instituteId', })

Student.hasMany(Result, { foreignKey: 'studentId' })
Result.belongsTo(Student, { foreignKey: 'studentId' })

Course.hasMany(Result, { foreignKey: 'courseId' })
Result.belongsTo(Course, { foreignKey: 'courseId' })

module.exports = {
    sequelize,
    Institute,
    Student,
    Course,
    Result,
    User
}