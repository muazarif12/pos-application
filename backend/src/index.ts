import 'module-alias/register';
import createError from 'http-errors';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {router} from "@/routes/index"

const app = express(); // express app created

app.use(express.json());  // to pass json encoded bodies // express.json() is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads (i.e., requests where the Content-Type 
// header matches application/json) and makes the parsed data available on req.body.

app.use(express.urlencoded({extended: false})); //to pass url encoded bodies set to false
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

//code for connection to MongoDB

(async function() {    // could have used function() instead of () => 
    
    try{
        await mongoose.connect("mongodb://localhost:27017/pos-db") //Mongoose's connect() method is asynchronous and returns a Promise object
        console.log('Connection has been established successfully');
    }catch (error) {
        console.error('Unable to connect to the database:', error)
    }
})();

app.use('/', router)
 

const PORT = 5600;

app.listen(PORT,()=>{
    console.log(`pos-system listening at port ${PORT}`)
})