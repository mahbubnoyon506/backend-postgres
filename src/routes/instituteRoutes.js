const express = require('express');
const router = express.Router()
const instituteController = require('../controllers/instituteController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, instituteController.createInstitute)
router.get('/', instituteController.getAllInstitutes)
router.get('/:id/results', instituteController.getInstituteResults)
router.delete('/:id', authMiddleware, instituteController.deleteInstitute)
router.put('/:id', authMiddleware, instituteController.updateInstitute)

module.exports = router