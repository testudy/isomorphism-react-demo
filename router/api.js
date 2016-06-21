const router = require('koa-router')();
const apiController = require('../controller/api');

router.get('/test', apiController.queryTest);
router.post('/test', apiController.createTest);
router.get('/questions', apiController.queryQuestions);

router.post('/backend/question', apiController.createQuestion);

module.exports = router;
