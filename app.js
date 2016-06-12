const path = require('path');

const koa = require('koa');
const config = require('./config/config');


const app = koa();
app.keys = ['tea'];


const compress = require('koa-compress');
app.use(compress());


const onerror = require('koa-onerror');
onerror(app);


const staticCache = require('koa-static-cache');
app.use(staticCache(config.staticDir, {
    dynamic: true,
}));


const session = require('koa-generic-session');
app.use(session(app));


const bodyParser = require('koa-bodyparser');
app.use(bodyParser());


//const csrf = require('koa-csrf');
//csrf(app);
//app.use(csrf.middleware);


const register = require('babel-register');
register({
    presets: [
        'es2015',
        'react',
    ],
    extensions: [
        '.jsx',
    ],
});

// 初步想法
// 将其放置到具体的app中是较合理的
// 由于react是向app.context绑定方法，暂时没有办法
// 将其修改为middleware是较友好的方法
// 所以，只能多写一层路径了，造成了耦合
const react = require('koa-react-view');
react(app, {
    views: config.viewDir,
    beautify: true,
});


const router = require('koa-router')();

const apiRouter = require('./router/api');
router.use('/api', apiRouter.routes());

const adminRouter = require('./router/admin');
router.use('/admin', adminRouter.routes());

app.use(router.routes());


app.use(function *() {
    this.render('view/frontend', {
        title: 'Tea Frontend',
        csrf: this.csrf,
    });
});


app.listen(config.port);
