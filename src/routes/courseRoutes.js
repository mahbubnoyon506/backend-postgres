const express = require('express')
const router = express.Router();
const courseController = require('../controllers/courseController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, courseController.createCourse)
router.post('/results', authMiddleware, courseController.addResult)

module.exports = router