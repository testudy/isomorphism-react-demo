const MongoClient = require('mongodb').MongoClient;
const config = require('../config/config');


module.exports = {
    db: function *client() {
        return yield MongoClient.connect(config.db);
    },
};
