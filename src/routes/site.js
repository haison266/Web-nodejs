var express = require('express');
var router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search); // fixed route for search page
router.get('/', siteController.home); // fixed route for home page

module.exports = router;
