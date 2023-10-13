var express = require('express'); //imports the Express.js module using Node.js's require function.
var app = express(); //creates an instance of an Express application

var port = process.env.PORT || 3000; //sets the port number that the server will listen on
app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function(req,res){
    res.send("Aloha World!");
});

app.get('/routing', function(req,res){
    res.send("Aloha Routing!");
});

app.listen(port, function(err){ //tells the Express application to start a server and listen for requests on the specified port
   console.log('The server is running on port: ' + port);
});