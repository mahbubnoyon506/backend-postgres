
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, studentController.createStudent)
router.get('/', studentController.getAllStudents)

module.exports = router





































