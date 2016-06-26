const router = require('koa-router')();
const config = require('../config/config');

router.get('/', function *() {
    this.render('frontend', {
        title: config.title,
        csrf: this.csrf,
    });
});

router.get('/:timestamp/:phone', function *() {
    this.render('frontend', {
        title: config.title,
        csrf: this.csrf,
    });
});

router.get('/done', function *() {
    this.render('frontend', {
        title: config.title,
        csrf: this.csrf,
    });
});

module.exports = router;
