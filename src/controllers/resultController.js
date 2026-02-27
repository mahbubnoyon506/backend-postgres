const { Result, Student, Course } = require("../models");

exports.addResult = async (req, res) => {
    try {
        const { studentId, courseId, grade, semester } = req.body;
        const result = await Result.create({ studentId, courseId, grade, semester })
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getAllResults = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Result.findAndCountAll({
            limit,
            offset,
            include: [
                { model: Student, attributes: ['name', 'email'] },
                { model: Course, attributes: ['title', 'code'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(201).json({
            totalItems: count,
            totalPage: Math.ceil(count / limit),
            currentPage: page,
            data: rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { grade, semester } = req.body;

        const result = await Result.findByPk(id);
        if (!result) return res.status(404).json({ error: "Result record not found" });

        await result.update({
            grade: grade !== undefined ? grade : result.grade,
            semester: semester || result.semester
        });

        res.status(201).json({ message: "Result updated successfully", data: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteResult = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Result.findByPk(id);

        if (!result) return res.status(404).json({ error: "Result not found" });

        await result.destroy();
        res.status(201).json({ message: "Result deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};