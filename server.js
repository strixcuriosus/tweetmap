var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Twit = require('Twit');
var port = process.env.PORT || 8080;

server.listen(port);
console.log('Listening on port ', port);

app.use(express.static(__dirname + '/client'));

var T = new Twit({
  consumer_key: process.env.TWIT_CONSUMER_KEY,
  consumer_secret: process.env.TWIT_CONSUMER_SECRET,
  access_token: process.env.TWIT_ACCESS_TOKEN,
  access_token_secret: process.env.TWIT_ACCESS_TOKEN_SECRET
});

var sanFrancisco = ['-122.75', '36.8', '-121.75', '37.8'];

var stream = T.stream('statuses/filter', {locations: sanFrancisco});

io.on('connection', function(socket) {
  console.log('new connection established');
  stream.on('tweet', function (tweet) {
    socket.emit('tweet', tweet);
  });
});
