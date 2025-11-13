const newsRouter = require('./news');
const siteController = require('./site');
const coursesController = require('./courses');
const meController = require('./me');

function route(app) {
    app.use('/news', newsRouter); // all news routes
    app.use('/', siteController); // site routes
    app.use('/courses', coursesController); // all courses routes
    app.use('/me', meController); // me routes
}

module.exports = route;
