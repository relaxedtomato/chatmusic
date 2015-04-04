var app = angular.module('ChatMusic', []);

app.constant('YT_event', {
  STOP:            0,
  PLAY:            1,
  PAUSE:           2,
  STATUS_CHANGE:   3
});
