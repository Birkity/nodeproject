var express = require('express'); //imports the Express.js module using Node.js's require function.
var app = express(); //creates an instance of an Express application
var mongoClient = require('mongodb').MongoClient;

var port = process.env.PORT || 3000; //sets the port number that the server will listen on
var eventRouter = require('./src/routes/eventRoutes');
app.use(express.static('public'));
app.use(express.static('src/views'));
app.use(express.static("bower_components"));

app.set('views', './src/views');
app.set('view engine', 'ejs');


app.use('/Events', eventRouter)

app.get('/', function(req,res){
    //res.send("Aloha World!");
    res.render('index', {
        list: ['first val', '2nd val', '3rd val'],
        nav: [{Link : 'Services' , Text: 'Services'}, 
        {Link: 'Portfolio', Text: 'Portfolio'}, 
        {Link: 'About', Text:'About' },
        {Link: 'Team', Text:'Team' },
        {Link: 'Contact', Text: 'Contact' },
        {Link: 'Events', Text: 'Events'}
    ]

    });
});

app.get('/routing', function(req,res){
    res.send("Aloha Routing!");
});

app.listen(port, function(err){ //tells the Express application to start a server and listen for requests on the specified port
   console.log('The server is running on port: ' + port);
});