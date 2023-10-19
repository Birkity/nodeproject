var express = require('express');
var dbRouter = express.Router();

dbRouter.route('/AddEventData')
.get(function(req,res){
    
res.send('Succesful route test');
    });

module.exports = dbRouter;