const koa = require('koa');

const app = koa();
app.jsonSpaces = 0;


const router = require('koa-router')();

const apiRouter = require('./router/api');
router.use('/api', apiRouter.routes());

const adminRouter = require('./router/admin');
router.use('/admin', adminRouter.routes());

app.use(router.routes());


app.use(function *() {
    this.render('frontend/view/frontend', {
        title: 'Tea Frontend',
        csrf: this.csrf,
    });
});

module.exports = app;
