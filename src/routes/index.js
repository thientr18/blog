const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');

function route(app) {
    app.use('/news', newsRouter); // Truy cập vào /news --> thực thi news.js
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter); //

    app.use('/', siteRouter); //
}

module.exports = route;