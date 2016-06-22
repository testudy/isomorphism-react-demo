const router = require('koa-router')();
const apiController = require('../controller/api');

router.get('/test', apiController.queryTest);
router.post('/test', apiController.createTest);
router.get('/questions', apiController.queryQuestions);

router.put('/backend/question', apiController.createQuestion);
router.delete('/backend/question', apiController.removeQuestion);

module.exports = router;
