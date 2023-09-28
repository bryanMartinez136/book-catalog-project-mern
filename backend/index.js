import express, { request, response } from "express";
import { PORT } from "./config.js";


const app = express();

// create a new route
app.get('/', (request, response) => {
    console.log(request); 
    return response.status(234).send("Welcome to MERN Stack !"); 
}); 


// check if server is running
app.listen(PORT, () => {
    console.log('App is listening to port: ' + PORT);
});