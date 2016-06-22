const parse = require('co-busboy');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;

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
            question.image = imagePath;
            console.log(question);
            const db = yield MongoClient.connect('mongodb://localhost:27017/tea');
            const questions = db.collection('questions');
            yield questions.insert(question);
            this.body = question;
        }
    },
};
