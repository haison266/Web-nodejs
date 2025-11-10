var express = require('express');
var router = express.Router();

const newsController = require('../app/controllers/NewsController');

router.get('/:slug', newsController.show); // fixed route for show page
router.get('/', newsController.index); // fixed route for index page

module.exports = router;
