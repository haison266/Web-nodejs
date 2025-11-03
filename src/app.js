const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = 3000;
const engine = exphbs.engine;
const route = require('./routes/');
const db = require('./config/db');

// Connect to the database
db.connect().then(() => {
    require('./app/model/Courses'); // register model
    const route = require('./routes'); // require routes after models are registered
    route(app);
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
