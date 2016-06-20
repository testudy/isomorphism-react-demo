const router = require('koa-router')();

router.get('/', function *() {
    this.render('backend', {
        title: 'Tea Frontend Backend',
        csrf: this.csrf,
    });
});

router.get('/lib', function *() {
    this.render('backend', {
        title: 'Tea Frontend Backend',
        csrf: this.csrf,
    });
});

router.get('/lib/create/:isMulti', function *() {
    this.render('backend', {
        title: 'Tea Frontend Backend',
        csrf: this.csrf,
    });
});

module.exports = router;
