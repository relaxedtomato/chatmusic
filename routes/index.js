var router = require('express').Router();
var path = require('path');




module.exports = function(io){

  router.get('/', function(req, res, next) {
  console.log("main route");

    io.on('connection', function(socket){
      socket.emit('blahblah', {hello:'world'});
        io.on('STOPPED', function(data){
          console.log(data);
        });
    });


    res.sendFile(path.join(__dirname, '../views/index.html'));
  });

  return router;
};