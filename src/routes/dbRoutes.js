var express = require('express');
var dbRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

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

dbRouter.route('/AddEventData')
.get(function(req,res){
       var url = 'mongodb://127.0.0.1:27017/mongo';    
       mongodb.connect(url, function(err, db){
       var collection = db.collection('events');
       collection.insertMany(eventData, function(err, results){
           res.send(results);
           db.close();
       });
       });
    });

module.exports = dbRouter;