const  {MongoClient} = require("mongodb")

let dbCollection

module.exports = {
    connectToDb: () => {
        MongoClient.connect('mongodb+srv://ayu123:ayu123456@cluster0.sas2ffg.mongodb.net/?retryWrites=true&w=majority')
            .then((client) => {
                dbCollection = client.db()
            })
            .catch( err => {
                console.log('Error connecting to the DB::', err)
            })
    },
    getDb: () => {dbCollection}
} 