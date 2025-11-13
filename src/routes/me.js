const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/courses', meController.storedCourses); //GET My Courses
router.get('/stored/news', meController.storedNews); //Get My News

module.exports = router;
