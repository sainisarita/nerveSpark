const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const Routes = require('./routes/Routes');

const app = express();

const uri ="mongodb+srv://sarita:sarita9643@cluster0.gbywgfa.mongodb.net";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db('NerveSparkData');

    // Set up middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Add database reference to the request object
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // Define routes
    app.use('/', Routes);

    // Start the server
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server connect on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect server', err);
    process.exit(1); // Exit the process with an error code
  }
}

run().catch(console.error);
