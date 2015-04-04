// node modules
var express    = require('express'),
    bodyParser = require('body-parser'),
    logger     = require('morgan')('dev'),
    nodeSass   = require('node-sass-middleware'),
    path = require('path'),
    io   = require('socket.io');

// app instantiation
var app = express();

// req-res logging
app.use(logger);

// sass middleware
var sassMiddleware = nodeSass({
  src: __dirname + '/assets',
  dest: __dirname + '/public',
  debug: true
});
app.use(sassMiddleware);

// server initialization
var port = 1337;
var server = app.listen(port, function () {
  console.log('The server is ALIVE! And listening to port', port);
});

var socket = io.listen(server);

// static middleware (if we have a matching file, just send it back)
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname,'/bower_components')));

// body parsing (if the http request has a body, make it a req.body object)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// root route
app.use('/', require('./routes/index')(socket));

// catch 404 (i.e., no routes were hit) and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into next())
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.send({error: err});
});

