const path = require('path');
const express = require('express');
var methodOverride = require('method-override')
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

// Connect to database
db.connect();

const app = express(); // create express app
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs', 
    engine({ 
        extname: '.hbs', 
        helpers: require('./helpers/handlebars'),
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(methodOverride('_method'))

//Custom middlewares
app.use(SortMiddleware);

// Initialize routes
route(app);

// 127.0.0.1 = localhost
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
