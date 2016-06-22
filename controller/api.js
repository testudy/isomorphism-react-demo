const parse = require('co-busboy');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    queryTest: function *() {
        this.body = {
            name: 'hujiwei',
            phone: '18610519178',
            date: Date.now(),
        };
    },

    createTest: function *() {
        this.body = {
            name: 'hujiwei',
            phone: '18610519178',
            date: Date.now(),
        };
    },

    queryQuestions: function *() {
        const db = yield MongoClient.connect('mongodb://localhost:27017/tea');
        const questions = db.collection('questions');
        //yield questions.insertMany(require('../data/questions'));
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
