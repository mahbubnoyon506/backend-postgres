
const { Course, Result } = require('../models');

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body)
        res.status(201).json(course)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.addResult = async (req, res) => {
    try {
        const { studentId, courseId, grade, semester } = req.body;
        const result = await Result.create({ studentId, courseId, grade, semester })
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
