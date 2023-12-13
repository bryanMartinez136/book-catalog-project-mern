import express, { request, response } from "express";
import { PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'


const app = express();

//Middleware for parsing request body
app.use(express.json()); 

//middle ware for handling cors policy 
app.use(cors())

// create a new route
app.get('/', (request, response) => {
    console.log(request); 
    return response.status(234).send("Welcome to MERN Stack !"); 
}); 

app.use('/books', booksRoute); 

mongoose
    .connect(mongoDBURL)
    .then( () => {
        console.log('App connected to database'); 
        app.listen(PORT, () => {
            console.log('App is listening to PORT: ' + PORT);
        });
    })
    .catch((error) => {
        console.log(error); 
    }); 
