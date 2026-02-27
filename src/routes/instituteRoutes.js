const express = require('express');
const router = express.Router()
const instituteController = require('../controllers/instituteController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, instituteController.createInstitute)
router.get('/', instituteController.getAllInstitutes)

module.exports = router