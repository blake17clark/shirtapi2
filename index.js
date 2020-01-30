const express = require('express')
const app = express()
const cors = require('cors')
require("dotenv").config();
const port = process.env.PORT || 4000
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectID;
const db_url= process.env.LINK_URL
const mongoParameters = { useNewUrlParser: true, useUnifiedTopology: true };     // deperacated unless we use this code, looked it up
const database = "FFR";
const collection = "Shirts";   //  where api is connecting to the data base n linking to UI

app.use(express.json())
app.use(cors())

// const client = new MongoClient(db_url, { useNewUrlParser: true, useUnifiedTopology: true });    '/= is the path to port 4000

//     if (err) throw err
//     db.collection('Shirts').find().toArray(function (err, result){
//         if (err) throw err
//         console.log(result)
//     })
// }) now I need to do a fetch on the front end to talk to API. We're talking to mongo now


app.get('/orders', (_req, res) => {
  MongoClient.connect(db_url, mongoParameters, (err, client) => {
    if (err) throw err
    const db = client.db(database)
    db.collection(collection).find().toArray((err, results) => {
      if (err) throw err
      res.send(results)
      // client.close();       Get FFR database n Shirts collection use express Read
    }) 
  }) 

});

   app.post("/", (req, res) => {
     console.log(req.body)
    MongoClient.connect(db_url, mongoParameters, async (err, client) => {
      if (err) throw err
      const db = client.db(database)
      await db.collection(collection).insertMany([{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,  
        mailingAddress: req.body.mailingAddress,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        payment: req.body.payment,
        items: req.body.items
      }])
      res.send(req.body.firstName);
      
      client.close();
    });
});

// post is Create. Async has await for each variable


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
    res.send("Update Successful");

    client.close();
  });
  })
   // put is my update


//delete lead by ID
app.delete("/:ID", (req, res) => {
  MongoClient.connect(db_url, mongoParameters, async(err, client) => {
    if (err) throw err
    const db = client.db(database)
    const result = await db.collection(collection).deleteOne({_id: ObjectId(req.params.ID)});
    console.log(result);
    res.send(result);

    client.close();
  });
  })



app.listen(port,() => {console.log(`Listening on port ${port}`)})






// MongoClient.connect(db_url, mongoParameters, async(err, client) => {
//   if (err) throw err
//   const db = client.db(database)
//   const results = await db.collection(collection)
//   })