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
};
