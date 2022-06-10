// var userArgs = process.argv.slice(2);
//
// console.log(userArgs[0]);

var mongoose = require('mongoose');
var async = require('async')

var AuthorSchema = new mongoose.Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  });

const agg = [
  {
    '$project': {
      'account_id': 1
    }
  }, {
    '$match': {
      'account_id': {
        '$gt': 300000
      }
    }
  }, {
    '$sort': {
      'account_id': 1
    }
  }
];

const agggg = {
    date_of_birth: {
      $exists: true
    }
};

let uri = `mongodb+srv://Timu:SxINJYR4pNK9Paos@timu.dw6wo.mongodb.net/book_records?retryWrites=true&w=majority`

mongoose.connect(uri)
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));
// mongoose.Promise = global.Promise; Mongoose 4
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Author = mongoose.model('Author', AuthorSchema);
function findAuthor() {
  Author.find(agggg, (err, data) => {
      if (err) throw err;
      console.log(data);
    });
}

async.series([
  findAuthor
],
  (err, results) => {
      console.log(err, results);
      mongoose.connection.close();
});
