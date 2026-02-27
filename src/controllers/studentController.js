const { Institute, Student } = require("../models");

exports.createStudent = async (req, res) => {
    try {
        const { name, email, instituteId } = req.body;

        const institute = await Institute.findByPk(instituteId)
        if (!institute) {
            return res.status(404).json({ error: 'Institute not found' })
        }

        const student = await Student.create({ name, email, instituteId })
        res.status(201).json(student)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getAllStudents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Student.findAndCountAll({
            limit,
            offset,
            include: [{
                model: Institute,
                attributes: ['name', 'location']
            }],
            order: [['createdAt', 'DESC']]
        })

        res.json({ totalItems: count, data: rows })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}