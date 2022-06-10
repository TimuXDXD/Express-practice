const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

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

const username = encodeURIComponent("Timu");
const password = encodeURIComponent("SxINJYR4pNK9Paos");
const cluster = "timu.dw6wo.mongodb.net";
const database = "sample_analytics";

let uri =
  `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect()
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

    const database = client.db("sample_analytics");
    const ratings = database.collection("accounts");

    const cursor = ratings.find();

    await cursor.forEach(doc => console.dir(doc));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
MongoClient.connect(uri)
.
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(connectErr, client) {
    assert.equal(null, connectErr);
    const coll = client.db('').collection('');
    coll.aggregate(agg, (cmdErr, result) => {
      assert.equal(null, cmdErr);
    });
    client.close();
  });
