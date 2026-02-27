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

        res.json({
            totalItems: count,
            totalPage: Math.ceil(count / limit),
            currentPage: page,
            data: rows
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Student.destroy({ where: { id } })
        if (deleted) {
            return res.status(201).json({ message: 'Student deleted successfully' })
        }
        throw new Error('Student not found')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Student ID is required" });
        }

        const { name, email, instituteId } = req.body;

        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' })
        }

        if (instituteId) {
            const institute = await Institute.findByPk(instituteId)
            if (!institute) return res.status(404).json({ error: 'Target institute not found' })
        }

        await student.update({
            name: name || student.name,
            email: email || student.email,
            instituteId: instituteId || student.instituteId
        })
        res.status(201).json({ message: 'Student updated successfully', data: student })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}