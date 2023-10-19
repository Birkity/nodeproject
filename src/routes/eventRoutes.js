var express = require('express');

var eventRouter = express.Router();

var eventData = [
    {
        name: "First Event",
        description: "This is the first event description.",
        time: "2023-10-17 09:00 AM",
        location: ["Location 1", "Location 2"]
    },
    {
        name: "Second Event",
        description: "This is the second event description.",
        time: "2023-10-18 02:30 PM",
        location: ["Location 3", "Location 4"]
    },
    {
        name: "Third Event",
        description: "This is the third event description.",
        time: "2023-10-20 10:00 AM",
        location: ["Location 5", "Location 6"]
    }
];


eventRouter.route('/')
.get(function(req,res){
    var url = 'mongodb://127.0.0.1:27017/eventApp';    
    mongodb.connect(url, function(err, db){
    var collection = db.collection('events');
   collection.find({}).toArray(function(err, results){
    res.render('events', {
        list: ['first event', '2nd event', '3rd event'],
        nav: [{Link : 'Services' , Text: 'Services'}, 
        {Link: 'Portfolio', Text: 'Portfolio'}, 
        {Link: 'About', Text:'About' },
        {Link: 'Team', Text:'Team' },
        {Link: 'Contact', Text: 'Contact' },
        {Link: 'Events', Text: 'Events'}
    ],
     events: results

    });
   });
    });
 });

eventRouter.route('/:id')
.get(function(req,res){
    var id = req.params.id;
    res.render('event', {
        list: ['first event', '2nd event', '3rd event'],
        nav: [{Link : 'Services' , Text: 'Services'}, 
        {Link: 'Portfolio', Text: 'Portfolio'}, 
        {Link: 'About', Text:'About' },
        {Link: 'Team', Text:'Team' },
        {Link: 'Contact', Text: 'Contact' },
        {Link: 'Events', Text: 'Events'}
    ],
     events: eventData[id]

    });
})

module.exports = eventRouter;