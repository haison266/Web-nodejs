const newsRouter = require('./news');
const siteController = require('./site');
const coursesController = require('./courses');

function route(app) {
    app.use('/news', newsRouter); // news routes
    app.use('/', siteController); // site routes
    app.use('/courses', coursesController); // courses routes
}

module.exports = route;
