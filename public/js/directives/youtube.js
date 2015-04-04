app.directive('youtube', function($window, EventFactory) {
  return {
    restrict: "E",

    scope: {
      height: "@",
      width: "@",
      videoid: "@"
    },

    template: '<div></div>',

    link: function(scope, element, attributes) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;

      $window.onYouTubeIframeAPIReady = function() {

        player = new YT.Player(element.children()[0], {
          playerVars: {
            autoplay: 1,
            html5: 1,
            theme: "light",
            modesbranding: 0,
            color: "white",
            iv_load_policy: 3,
            showinfo: 1,
            controls: 1
          },

          height: scope.height,
          width: scope.width,
          videoId: scope.videoid,

          events: {
            onStateChange: onPlayerStateChange
          }
        });
      };

      scope.$watch('videoid', function(newValue, oldValue) {
        if (newValue == oldValue) {
          return;
        }
        console.log(player.getCurrentTime());
        player.cueVideoById(scope.videoid);

      });

      scope.$watch('height + width', function(newValue, oldValue) {
        if (newValue == oldValue) {
          return;
        }

        player.setSize(scope.width, scope.height);

      });

      function onPlayerStateChange(event) {
        var socket = EventFactory.socket;
        if(event.data === 0){ // ended
          socket.emit('ended', {currentTime: player.getCurrentTime()});
        } else if(event.data === 1){ //playing
          console.log(EventFactory.socket);
          socket.emit('playing', {currentTime: player.getCurrentTime()});
          console.log(player.getCurrentTime());
        } else if (event.data === 2){ //paused
          socket.emit('paused', {currentTime: player.getCurrentTime()});
          console.log(player.getCurrentTime());
        } else if (event.data === 5){ //video cued
          socket.emit('cued', {currentTime: player.getCurrentTime()});
          console.log(player.getCurrentTime());
        }
      }

      // scope.$on(YT_event.STOP, function () {
      //   socket.emit('STOPPED', {hello:'STOPPED'});
      //   player.seekTo(0);
      //   player.stopVideo();
      // });

      // scope.$on(YT_event.PLAY, function () {
      //   player.playVideo();
      // });

      // scope.$on(YT_event.PAUSE, function () {
      //   player.pauseVideo();
      // });

    }
  };
});