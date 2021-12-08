// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
/*Dependencies*/
const express= require('express');
const cors=require('cors');
const bodyParser=require('body-parser');


// Start up an instance of app
const app=express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
//connect body-parser nd cors to the express instance "app"
app.use(bodyParser.urlencoded({ extended: false }));// to support URL-encoded bodies
app.use(bodyParser.json());// to support JSON-encoded bodies


// Cors for cross origin allowance
app.use(cors()); 

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
//creating a local server
const port= 8880;

// Callback to debug
/*command --node server.js--*/
//arrow function
const server=app.listen(port, ()=>{
    console.log(`Running on localhost: ${port}`);
})

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// GET Route(post function )
//1st param :route, 2nd: func
app.get('/all', (request, response)=>{ //get all data, the arrow function will take 2 param: request nd response 
    response.send(projectData).status(200);// The success status code: 200 Ok
})

// Post Route(post function )
app.post('/add', (request, response)=>{
    //send data from a client to your API, you send it as a request body.
    let data= request.body;
    console.log(data);

    projectData = {
        date: data.date,
        temp: data.temp,
        content: data.content
    }
    response.send(projectData).status(200);
})
