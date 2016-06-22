const router = require('koa-router')();
const apiController = require('../controller/api');

router.get('/test', apiController.queryTest);
router.post('/test', apiController.createTest);
router.get('/questions', apiController.queryQuestions);

router.put('/backend/question', apiController.createQuestion);
router.get('/backend/question', apiController.getQuestion);
router.patch('/backend/question', apiController.updateQuestion);
router.delete('/backend/question', apiController.removeQuestion);

module.exports = router;
