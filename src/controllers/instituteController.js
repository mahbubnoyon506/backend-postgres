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

exports.deleteInstitute = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Institute.destroy({ where: { id } })
        if (deleted) {
            return res.status(201).json({ message: "Institute deleted" })
        }
        throw new Error("Institute not found")
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.updateInstitute = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location } = req.body;

        const institute = await Institute.findByPk(id);
        if (!institute) return res.status(404).json({ message: 'Institute not found with the ID' })

        await institute.update({
            name: name || institute.name,
            location: location || institute.location
        })
        res.status(201).json({ message: "Institute updated", institute })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}