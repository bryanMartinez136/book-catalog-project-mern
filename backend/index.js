import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";


const app = express();

// create a new route
app.get('/', (request, response) => {
    console.log(request); 
    return response.status(234).send("Welcome to MERN Stack !"); 
}); 


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