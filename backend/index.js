import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'


const app = express();

//Middleware for parsing request body
app.use(express.json()); 

//middle ware for handling cors policy 
app.use(cors())

//allow custom origins, you have more contorl
//only uses with these origins can access the server
app.use(
    cors({
        origin: 'http://localhost:3000', 
        methods: ['GET','POST', 'PUT', 'DELETE'], 
        allowedHeaders: ['Content-Type'], 
    })
)

// create a new route
app.get('/', (request, response) => {
    console.log(request); 
    return response.status(234).send("Welcome to MERN Stack !"); 
}); 

app.use('/books', booksRoute); 

// check if server is running

mongoose
    .connect(mongoDBURL)
    .then( () => {
        console.log('App connected to database'); 
        app.listen(PORT, () => {
            console.log('App is listening to port: ' + PORT);
        });
    })
    .catch((error) => {
        console.log(error); 
    }); 