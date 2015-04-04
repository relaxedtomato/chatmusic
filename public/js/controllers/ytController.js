app.controller('ytController', function($scope, EventFactory){

  console.log('ytController hit');

    $scope.songURL = "";

    $scope.videoID = "2HQaBWziYvY";

    $scope.submitSong = function(){
      if($scope.songURL){
        $scope.videoID = $scope.songURL.split('=')[1];
        EventFactory.addSong($scope.videoID);
      }
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