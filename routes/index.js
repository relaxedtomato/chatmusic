var router = require('express').Router();
var path = require('path');




module.exports = function(io){

  router.get('/', function(req, res, next) {
    console.log("main route");

    io.on('connection', function(socket){
      console.log("we connected");

      io.on('ended', function(data){

        console.log(data.currentTime);
      });

      io.on('playing', function(data){

        console.log("i give up");
        console.log(data.currentTime);
      });

      io.on('paused', function(data){
        console.log(data.currentTime);
      });

      io.on('cued', function(data){
        console.log(data.currentTime);
      });

      socket.emit('blahblah', {hello:'world'});
        io.on('STOPPED', function(data){
          console.log(data);
        });
    });
    res.sendFile(path.join(__dirname, '../views/index.html'));
  });

  router.post('/:songID', function(req, res, next){
    var id = req.params.songID;
    res.send(id);
    console.log(id);
  });

  router.delete('/:songID', function(req, res, next){
    var id = req.params.songID;
    res.send(id);
    console.log(id);
  });

  return router;
};