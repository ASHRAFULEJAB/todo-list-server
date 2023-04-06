const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
require("dotenv").config();

//middleware
app.use(express.json());
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Todo app is runnning...");
});
//  username= coreDevDB
// password:STE7m7E60nlNHStd

// mongoDB is connected Here
const uri =
  "mongodb+srv://TodoDB:AC3vXQhgFHGtehXf@cluster0.dnw37y6.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("ToDoDB").collection("users");
    const todoTitleCollection = client.db("ToDoDB").collection("title");

    //email is posted here
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    app.post("/api/todo/", async (req, res) => {
      const title = req.body;
      console.log(title);
      const result = await todoTitleCollection.insertOne(title);
      res.send(result);
    });
    app.get("/api/todo", async (req, res) => {
      const query = {};
      console.log(query)
      const result = await todoTitleCollection.find(query).toArray();
      res.send(result);
    });

  } finally {
  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log(`ToDo app is running on ${port}`);
});
