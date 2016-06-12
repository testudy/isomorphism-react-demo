const router = require('koa-router')();

router.get('/', function *() {
    this.render('frontend/view/backend', {
        title: 'Tea Frontend Backend',
        csrf: this.csrf,
    });
});

module.exports = router;
