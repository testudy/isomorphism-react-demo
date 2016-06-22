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
    prefix: 'public',
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


const react = require('koa-react-view');
react(app, {
    views: config.viewDir,
    beautify: true,
});


const router = require('koa-router')();

const apiRouter = require('./router/api');
router.use('/api', apiRouter.routes());

const backendRouter = require('./router/backend');
router.use('/backend', backendRouter.routes());

const frontendRouter = require('./router/frontend');
router.use('/', frontendRouter.routes());

app.use(router.routes());


app.use(function *() {
    this.redirect('back');
});


app.listen(config.port);
