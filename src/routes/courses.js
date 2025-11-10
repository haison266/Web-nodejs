var express = require('express');
var router = express.Router();

const coursesController = require('../app/controllers/CoursesController');

router.get('/create', coursesController.create); // fixed route for create page
router.post('/store', coursesController.store); // fixed route for store action
router.get('/:slug', coursesController.show); // fixed route for show page

module.exports = router;
