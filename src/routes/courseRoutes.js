const express = require('express')
const router = express.Router();
const courseController = require('../controllers/courseController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, courseController.createCourse)
router.get('/', courseController.getAllCourses)
router.put('/:id', authMiddleware, courseController.updateCourse)
router.delete('/:id', authMiddleware, courseController.deleteCourse)
router.post('/results', authMiddleware, courseController.addResult)

module.exports = router