const router = require('koa-router')();
const apiController = require('../controller/api');

router.put('/test', apiController.createTest);
router.get('/test', apiController.getTest);

router.get('/backend/questions', apiController.getQuestions);
router.put('/backend/question', apiController.createQuestion);
router.get('/backend/question', apiController.getQuestion);
router.patch('/backend/question', apiController.updateQuestion);
router.delete('/backend/question', apiController.removeQuestion);

module.exports = router;
