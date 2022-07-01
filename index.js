const { MongoClient, ServerApiVersion, ObjectId  } = require('mongodb');
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

//midlleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6w3c6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 console.log('connected');

async function run(){
    try{
        await client.connect();
        const taskCollection =client.db("Tasks-01").collection("tasks");
        

        // Get Data
        app.get('/tasks',async(req,res)=>{
            const query = {};
            const cursor = taskCollection.find(query);
            const tasks = await cursor.toArray();
            res.send(tasks);
        })

        //Post Data

        app.post('/tasks',async (req,res)=>{
            const newCollection= req.body;
            const result = await taskCollection.insertOne(newCollection);
            res.send(result);

        })

        // delete Data 
            app.delete('/tasks/:id', async (req,res)=>{
                const id = req.params.id;
                const query ={_id: ObjectId(id)};
                const deleteItem = await taskCollection.deleteOne(query);
                res.json(deleteItem);
            })
  





    }
    finally{

    }

}

run().catch(console.dir);


app.get('/',(req,res)=> {
    res.send('Running Server')
});


app.listen(port,()=>{
    console.log('Listening Listening ',port);
})