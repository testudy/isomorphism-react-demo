const path = require('path');
const parse = require('co-busboy');
const fs = require('fs');
const client = require('../util/client');
const config = require('../config/config');

const ObjectId = require('mongodb').ObjectId;

function random(min, max, count) {
    const result = [];

    function next() {
        const tmp = min + Math.floor(Math.random() * (max - min));
        if (result.indexOf(tmp) > -1) {
            return next();
        }
        return tmp;
    }

    if (min >= max) {
	return result;
    }

    if (count > (max - min)) {
	count = max - min;
    }

    for (let i = 0; i < count; i += 1) {
        result.push(next());
    }

    return result.sort(function (a, b) {
        return a > b;
    });
}


function *queryQuestions() {
    const db = yield client.db();
    const dbQuestions = db.collection('questions');
    const allQuestions = yield dbQuestions.find().toArray();
    const result = [];
    [1, 2, 3, 4].forEach(function (type) {
        const questions = allQuestions.filter((question) => question.type === type);
        if (questions) {
            result.push.apply(result, random(0, questions.length, config.testCountOfType).map(function (index) {
                return questions[index];
            }));
        }
    });
    return result;
}


function dateFormat(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dateOfMonth = date.getDate();
    return `${year}-${month}-${dateOfMonth}`;
}

function markTest(test, type) {
    const rightCount = test.questions.filter((question) => question.type === type).reduce((previousRightCount, question) => {
        if (question && question.options && question.answer) {

            const totalRightCount = question.options.reduce((previousValue, option) => {
                if (option.checked) {
                    return previousValue + 1;
                }
                return previousValue;
            }, 0);

            if (totalRightCount === question.answer.length) {
                let result = true;
                question.answer.forEach(function (index) {
                    if (!question.options[index].checked) {
                        result = false;
                    }
                });
                if (result) {
                    return previousRightCount + 1;
                }
            }

            return previousRightCount;
        }
        return previousRightCount;
    }, 0);

    return rightCount * 100 / test.questions.length;
}

module.exports = {
    createTest: function *() {
        const name = this.request.body.name;
        const phone = this.request.body.phone;
        const age = this.request.body.age;
        const industry = this.request.body.industry;
        const position = this.request.body.position;
        if (name && phone) {
            const db = yield client.db();
            const tests = db.collection('tests');
            const date = dateFormat(new Date());
            const test = {
                name,
                phone,
                date,
                age,
                industry,
                position,
                done: false,
            };

            let result = yield tests.findOne(test);

            if (!result) {
                let insertResult = yield tests.insertOne(test);
                result = insertResult.ops[0];
            }

            db.close();

            this.body = result;
        }
    },

    getTests: function *() {
        const date = this.request.query.date;

        if (date) {
            const db = yield client.db();
            const tests = db.collection('tests');

            const result = yield tests.find({
                date,
                done: true,
            }).toArray();
            db.close();

            this.body = result;
            return;
        }

        this.body = [];
    },

    getTest: function *() {
        const date = this.request.query.date;
        const phone = this.request.query.phone;
        if (date && phone) {
            const db = yield client.db();
            const tests = db.collection('tests');

            const test = yield tests.findOne({
                phone,
                date,
            });
            db.close();

            if (test && !test.done) {
                test.questions = yield queryQuestions();
                /*
                test.questions.forEach(function (question) {
                    if (question && question.options) {
                        question.options.forEach(function (option) {
                            delete option.checked;
                        });
                    }
                });
                */
             
            }

            this.body = test;

        }
    },

    updateTest: function *() {
        const test = this.request.body.test;
        if (test && test._id) {
            const db = yield client.db();
            const tests = db.collection('tests');
            const testId = test._id;
            delete test._id;
            test.done = true;
            test.score1 = markTest(test, 1);
            test.score2 = markTest(test, 2);
            test.score3 = markTest(test, 3);
            test.score4 = markTest(test, 4);
            test.score = test.score1 + test.score2 + test.score3 + test.score4;

            const result = yield tests.findOneAndUpdate({
                _id: new ObjectId(testId),
            }, {
                $set: test,
            }, {
                returnOriginal: false,
            });
            db.close();

            this.body = result.value;
        }
    },

    getQuestions: function *() {
        const db = yield client.db();
        const questions = db.collection('questions');
        const result = yield questions.find().toArray();
        db.close();
        this.body = result;
    },

    createQuestion: function *() {
        if (this.request.is('multipart')) {
            var parts = parse(this, {
                autoFields: true,
            });
            let part;
            let imagePath = '';
            while (part = yield parts) {
                if (part.fieldname === 'image') {
                    imagePath = `public/image/${Date.now()}-${part.filename}`;
                    part.pipe(fs.createWriteStream(path.join(__dirname, '..', imagePath)));
                }
            }
            const question = JSON.parse(parts.field.question);
            if (imagePath) {
                question.image = `/${imagePath}`;
            }
            const db = yield client.db();
            const questions = db.collection('questions');
            yield questions.insert(question);
            db.close();
            this.body = question;
        }
    },

    getQuestion: function *() {
        const questionId = this.request.query.questionId;
        if (questionId) {
            const db = yield client.db();
            const questions = db.collection('questions');
            const question = yield questions.findOne({
                _id: new ObjectId(questionId),
            });
            db.close();
            this.body = {
                question: question,
            };
        }
    },

    updateQuestion: function *() {
        let question;

        if (this.request.is('multipart')) {
            let parts = parse(this, {
                autoFields: true,
            });
            let part;
            let imagePath = '';
            while (part = yield parts) {
                if (part.fieldname === 'image') {
                    imagePath = `public/image/${Date.now()}-${part.filename}`;
                    part.pipe(fs.createWriteStream(path.join(__dirname, '..', imagePath)));
                }
            }
            question = JSON.parse(parts.field.question);
            if (imagePath) {
                question.image = `/${imagePath}`;
            }
        } else {
            question = this.request.body.question;
        }

        if (question && question._id) {
            const questionId = question._id;
            delete question._id;
            const db = yield client.db();
            const questions = db.collection('questions');

            const result = yield questions.findOneAndUpdate({
                _id: new ObjectId(questionId),
            }, {
                $set: question,
            });
            db.close();
            this.body = {
                question: result.value,
            };
        }
    },

    removeQuestion: function *() {
        const questionId = this.request.body.questionId;
        if (questionId) {
            const db = yield client.db();
            const questions = db.collection('questions');
            yield questions.findOneAndDelete({
                _id: new ObjectId(questionId),
            });
            db.close();
            this.body = {
                questionId: questionId,
            };
        }
    },
};
