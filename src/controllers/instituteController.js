const { Institute } = require("../models");


exports.createInstitute = async (req, res) => {
    try {
        const { name, location } = req.body;
        const institute = await Institute.create({ name, location })
        res.status(201).json(institute)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getAllInstitutes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Institute.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        })

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: rows
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}