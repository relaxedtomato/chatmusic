app.controller('ytController', function($scope, apiFactory){

  console.log('ytController hit');

    var socket = io.connect();

    $scope.songURL = "";

    $scope.videoID = "2HQaBWziYvY";

    $scope.submitSong = function(){
      $scope.videoID = $scope.songURL.split('=')[1];
    };

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        console.log(event);
        // if (event.data == YT.PlayerState.PLAYING && !done) {
        //   setTimeout(stopVideo, 6000);
        //   done = true;
        // }
      }

      $scope.emitMe = function(event, emitObj){
        socket.emit(event, emitObj);
      };


      function stopVideo() {
        player.stopVideo();
      }
});

// app.controller('testController', function($scope){
//     var socket = io.connect();

//     socket.on('blahblah', function (data) {
//       console.log(data);
//     });

//     $scope.emitMe = function(event, emitObj){
//       socket.emit(event, emitObj);
//     };
// });