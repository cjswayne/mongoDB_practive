const { MongoClient, ObjectId } = require('mongodb');


const url = 'mongodb://localhost:27017'
const client = new MongoClient(url);

module.exports = client.connect()
    .then(() => {
        return client.db('first_day_db'); 
    })
    