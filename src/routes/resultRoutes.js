const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const resultController = require('../controllers/resultController')

router.post('/', authMiddleware, resultController.addResult);
router.get('/', resultController.getAllResults);
router.put('/:id', authMiddleware, resultController.updateResult);
router.delete('/:id', authMiddleware, resultController.deleteResult);

module.exports = router