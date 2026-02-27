
const { Course } = require('../models');

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body)
        res.status(201).json(course)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getAllCourses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { count, rows } = await Course.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        })
        res.status(201).json({
            totalItems: count,
            totalPage: Math.ceil(count / limit),
            currentPage: page,
            data: rows
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Course.destroy({ where: { id } });
        if (deleted) return res.status(201).json({ message: "Course deleted" })
        throw new Error("Course not found")
    } catch (error) {
        res.status(201).json({ error: error.message })
    }
}

exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, code } = req.body;
        const course = await Course.findByPk(id);
        if (!course) return res.status(404).json({ message: "Course not found" })
        await course.update({
            title: title || course.title,
            code: code || course.code
        })
        res.status(201).json({ message: "Course updated", course })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

