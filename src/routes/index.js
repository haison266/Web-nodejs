const newsRouter = require('./news');
const siteController = require('./site');


function route(app) {
  
    app.use('/news', newsRouter);
    app.use('/', siteController); 
    
}

module.exports = route;