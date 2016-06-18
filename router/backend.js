const router = require('koa-router')();

router.get('/', function *() {
    this.render('backend', {
        title: 'Tea Frontend Backend',
        csrf: this.csrf,
    });
});

module.exports = router;
