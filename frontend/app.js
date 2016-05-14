const koa = require('koa');

const app = koa();

app.use(function *() {
    this.render('frontend/view/index', {
        title: 'Tea Frontend',
        csrf: this.csrf,
    });
});

module.exports = app;
