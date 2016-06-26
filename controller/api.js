const parse = require('co-busboy');
const fs = require('fs');
const client = require('../util/client');

const MongoClient = require('mongodb').MongoClient;
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
    const questions = yield dbQuestions.find().toArray();
    return random(0, questions.length, 2).map(function (index) {
        return questions[index];
    });
}


function dateFormat(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dateOfMonth = date.getDate();
    return `${year}-${month}-${dateOfMonth}`;
}

module.exports = {
    createTest: function *() {
        const name = this.request.body.name;
        const phone = this.request.body.phone;
        if (name && phone) {
            const db = yield client.db();
            const tests = db.collection('tests');
            const date = dateFormat(new Date());
            const test = {
                name,
                phone,
                date,
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
        console.log(date);

        if (date) {
            const db = yield client.db();
            const tests = db.collection('tests');

            const result = yield tests.find({
                date,
            }).toArray();
            console.log(result);
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
                test.questions.forEach(function (question) {
                    if (question && question.options) {
                        question.options.forEach(function (option) {
                            delete option.checked;
                        });
                    }
                });
             
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

            const result = yield tests.findOneAndUpdate({
                _id: new ObjectId(testId),
            }, {
                $set: test,
            }, {
                returnOriginal: false,
            });
            db.close();

            this.body = {
                test: result.value,
            };
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
                    part.pipe(fs.createWriteStream(imagePath));
                }
            }
            const question = JSON.parse(parts.field.question);
            if (imagePath) {
                question.image = `/${imagePath}`;
            }
            const db = yield MongoClient.connect('mongodb://localhost:27017/tea');
            const questions = db.collection('questions');
            yield questions.insert(question);
            db.close();
            this.body = question;
        }
    },

    getQuestion: function *() {
        const questionId = this.request.query.questionId;
        if (questionId) {
            const db = yield MongoClient.connect('mongodb://localhost:27017/tea');
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
                    part.pipe(fs.createWriteStream(imagePath));
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
            const db = yield MongoClient.connect('mongodb://localhost:27017/tea');
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
            const db = yield MongoClient.connect('mongodb://localhost:27017/tea');
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
