var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatmusic');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var songSchema = new mongoose.Schema({
  url: String,
  time: Number,
  name: String,
});

var playlistSchema = new mongoose.Schema({
  songlist: [songSchema]
});

module.exports = {
  Song: mongoose.model('Song', songSchema),
  Playlist: mongoose.model('Playlist', playlistSchema),
};
