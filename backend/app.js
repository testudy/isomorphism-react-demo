const koa = require('koa');
const app = koa();

app.use(function *() {
    this.render('backend/view/index', {
        title: 'Tea Backend',
        csrf: this.csrf,
    });
});

module.exports = app;
