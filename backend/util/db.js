const mongodb = require('mongodb');
const db = mongodb.MongoClient;

let _database;

const getDb = () => {
  if (_database) {
    return _database;
  }
  throw '400 not found';
};

const dbConnect = callback => {
  db.connect(process.env.DB_URI)
    .then(client => {
      console.log('Mongo is just pawn in game of life');
      _database = client.db();
      callback();
    })
    .catch(err => console.error(err));
};

module.exports = { getDb, dbConnect };
