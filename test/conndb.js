const { MongoClient } = require("mongodb");

const username = encodeURIComponent("Timu");
const password = encodeURIComponent("SxINJYR4pNK9Paos");
const cluster = "timu.dw6wo.mongodb.net";
const collection = "<collection>";
const authSource = "<authSource>";
const authMechanism = "<authMechanism>";
// mongodb+srv://Timu:<password>@timu.dw6wo.mongodb.net/?retryWrites=true&w=majority
let uri =
  `mongodb+srv://${username}:${password}@${cluster}/${collection}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_analytics");
    const ratings = database.collection("accounts");

    const cursor = ratings.find();

    await cursor.forEach(doc => console.dir(doc));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
