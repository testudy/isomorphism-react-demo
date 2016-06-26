const router = require('koa-router')();
const config = require('../config/config');

router.get('/', function *() {
    this.render('backend', {
        title: config.title + '系统后台',
        csrf: this.csrf,
    });
});

router.get('/lib', function *() {
    this.render('backend', {
        title: config.title + '系统后台',
        csrf: this.csrf,
    });
});

router.get('/lib/create/:multi', function *() {
    this.render('backend', {
        title: config.title + '系统后台',
        csrf: this.csrf,
    });
});

router.get('/lib/update/:questionId', function *() {
    this.render('backend', {
        title: 'Tea Frontend Backend',
        csrf: this.csrf,
    });
});

module.exports = router;
