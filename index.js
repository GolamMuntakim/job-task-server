const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
// middlewre
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ajfjwu7.mongodb.net/?appName=Cluster0`;
console.log(uri)



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  
    const newCollection = client.db('newTherapi').collection('therapist');
    
    app.get('/new',async(req, res)=>{
        const cursor = newCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })
    app.post('/new',async(req,res)=>{
        const newAdded = req.body;
        console.log(newAdded)
        const result = await newCollection.insertOne(newAdded)
        res.send(result);
    })

     app.get("/single/:id", async(req,res)=>{
        console.log(req.params.id)
        const result = await newCollection.findOne({_id:new ObjectId(req.params.id)})
        console.log(result)
        res.send(result)
     })
 
     app.delete("/delete/:id",async(req,res)=>{
        const result = await newCollection.deleteOne({_id:new ObjectId(req.params.id)})
        console.log(result)
        res.send(result)
     })
   

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('server is fucking');
})
app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})