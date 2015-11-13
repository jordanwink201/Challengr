/*

server.js
express/node server 

*/

// load environment variables from .env file
require('dotenv').load();

// create express app
var express = require('express');
var app = express();

// logging requests to the server
var morgan = require('morgan');
// parsing HTTP request bodys
var bodyParser = require('body-parser');

// choose process port if applicable
var port = process.env.PORT || 3000;

app.use(morgan('dev'));
// parses application/x-www-form-urlencoded from forms
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// serving static files from client folder
app.use(express.static(__dirname + '/../client'));

// creating router for all requests to '/api/auth'
var authRouter = express.Router();

// configuring router to server all requests to 'api/auth'
app.use('/api/auth', authRouter);
// everything after here is protected and checks for jot

// order will be important here as the authRouter protects all future routes
// injecting authRouter for setup of routes
require(__dirname + '/auth/authRouter.js')(authRouter);

// start server to listen on localhost:port
app.listen(port);
console.log('Challengr is listening on port ', port);
