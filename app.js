// node modules
var express    = require('express'),
    bodyParser = require('body-parser'),
    logger     = require('morgan')('dev'),
    nodeSass   = require('node-sass-middleware');

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

// static middleware (if we have a matching file, just send it back)
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// body parsing (if the http request has a body, make it a req.body object)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// root route
app.use('/', require('./routes/index'));

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

// server initialization
var port = 1337;
app.listen(port, function () {
  console.log('The server is ALIVE! And listening to port', port);
});
