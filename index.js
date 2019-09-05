const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectID;
const db_url=
    'mongodb+srv://admin1blakeffr:BlakeHelio2@cluster0-s2mfp.mongodb.net/test?retryWrites=true&w=majority'
const mongoParameters = { useNewUrlParser: true, useUnifiedTopology: true };
const database = "FFR";
const collection = "Shirts";   

app.use(express.json())
app.use(cors())

// const client = new MongoClient(db_url, { useNewUrlParser: true, useUnifiedTopology: true });    '/= is the path to port 4000

// MongoClient.connect('mongodb+srv://admin1blakeffr:BlakeHelio2@cluster0-s2mfp.mongodb.net/test?retryWrites=true&w=majority', function (err, db){
//     if (err) throw err
//     db.collection('Shirts').find().toArray(function (err, result){
//         if (err) throw err
//         console.log(result)
//     })
// }) now I need to do a fetch on the front end to talk to API. We're talking to mongo now


app.get('/', (req, res) => {
  MongoClient.connect(db_url, mongoParameters, (err, client) => {
    if (err) throw err
    const db = client.db(database)
    db.collection(collection).find().toArray((err, results) => {
      if (err) throw err
      res.send(results)
      // client.close();
    }) 
  }) 

});

   app.post("/", (req, res) => {
    MongoClient.connect(db_url, mongoParameters, async(err, client) => {
      if (err) throw err
      const db = client.db(database)
      const results = await db.collection(collection).insertOne(req.body)
    
      res.send(results.insertedId);
      
      client.close();
    });
});




//update lead by ID two step setup delete and post this will be harder
// app.put("/:ID", (req, res) => {
//   const body = req.body;
//   client.connect(async err => {
//     const collection = client.db(database).collection(collection);
//     // perform actions on the collection object
//     const results = await collection.updateOne({_id: ObjectId(req.params.ID)},{$set: body});
//     res.send(results);

//     client.close();
//   });
// })

app.put("/:ID", (req, res) => {
  MongoClient.connect(db_url, mongoParameters, async(err, client) => {
    if (err) throw err
    const db = client.db(database)
    const results = await db.collection(collection).updateOne({_id: ObjectId(req.params.ID)},{$set: req.body});
    res.send("Update Success");

    client.close();
  });
  })



//delete lead by ID
app.delete("/:ID", (req, res) => {
  MongoClient.connect(db_url, mongoParameters, async(err, client) => {
    if (err) throw err
    const db = client.db(database)
    await db.collection(collection).deleteOne({_id: ObjectId(req.params.ID)});
    res.send("deleted" + req.params.ID);

    client.close();
  });
  })



app.listen(port,() => {console.log(`Listening on port ${port}`)})






// MongoClient.connect(db_url, mongoParameters, async(err, client) => {
//   if (err) throw err
//   const db = client.db(database)
//   const results = await db.collection(collection)
//   })