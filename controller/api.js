const parse = require('co-busboy');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

function random(min, max, count) {
    const result = [];

    function next() {
        const tmp = min + Math.round(Math.random() * (max - min));
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

module.exports = {
    createTest: function *() {
        this.body = {
            name: 'hujiwei',
            phone: '18610519178',
            date: (new Date().toISOString().split('T')[0]),
        };
    },

    queryQuestions: function *() {
        const db = yield MongoClient.connect('mongodb://localhost:27017/tea');
        const dbQuestions = db.collection('questions');
        const questions = yield dbQuestions.find().toArray();
        this.body = random(0, questions.length, 2).map(function (index) {
            return questions[index];
        });
    },

    getQuestions: function *() {
        const db = yield MongoClient.connect('mongodb://localhost:27017/tea');
        const questions = db.collection('questions');
        this.body = yield questions.find().toArray();
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
