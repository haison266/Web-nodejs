const newsRouter = require('./news');
const siteController = require('./site');
const coursesController = require('./courses');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/', siteController);
    app.use('/courses', coursesController);
}

module.exports = route;
