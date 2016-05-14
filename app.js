const path = require('path');

const koa = require('koa');
const config = require('./config/config');


const app = koa();
app.keys = ['tea'];


const compress = require('koa-compress');
app.use(compress());


const onerror = require('koa-onerror');
onerror(app);


const session = require('koa-generic-session');
app.use(session(app));


const bodyParser = require('koa-bodyparser');
app.use(bodyParser());


const csrf = require('koa-csrf');
csrf(app);
app.use(csrf.middleware);


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




app.listen(config.port);
