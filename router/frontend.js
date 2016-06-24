const router = require('koa-router')();

router.get('/', function *() {
    this.render('frontend', {
        title: 'Tea Frontend',
        csrf: this.csrf,
    });
});

router.get('/:timestamp/:phone', function *() {
    this.render('frontend', {
        title: 'Tea Frontend',
        csrf: this.csrf,
    });
});

router.get('/done', function *() {
    this.render('frontend', {
        title: 'Tea Frontend',
        csrf: this.csrf,
    });
});

module.exports = router;
