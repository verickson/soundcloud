SC.initialize({
 client_id: 'fd4e76fc67798bfa742089ed619084a6'
});

// resolve method
// SC.resolve("http://soundcloud.com/forss/voca-nomen-tuum").then(function(response) {
//  // things to do after the track info loads...
//  // this should display all relevant information regarding the track
//  // e.g title, author, album art
//  console.log(response);
//  // this track id is 41772991
// });

// // by track id
// document.getElementById('track-id').addEventListener('change', function(){
//   var id = this.value;
//
//   SC.get("/tracks/" + id).then(function(response) {
//    // things to do after the tracks load...
//    // this should display all relevant information regarding the track
//    // e.g title, author, album art
//    console.log(response);
//   });
// });

// this is with the dynamic input
// var query;
// document.getElementById('search').addEventListener('change', function(){
//   query = this.value;
//   SC.get("/tracks", {q: query}).then(function(response) {
//    // things to do after the tracks load...
//    // this should display all relevant information regarding the track
//    // e.g title, author, album art
//    console.log(response);
//   });
// });

// // streaming a track 336768726
// SC.stream("/tracks/336768726").then(function(player){
//   // console.log(player);
//  // streams the track
//  player.play();
// });

// extracting id from resolve method and streaming the track
// var id;
// SC.resolve('https://soundcloud.com/sashasashamarie/sunflowers-melancholy').then(function(response) {
//  // extract this track id
//  id = response.id;
//  // now stream it
//  SC.stream('/tracks/' + id).then(function(player){
//   // streams the track
//   player.play();
//  });
// });

// // functions of the player
//  SC.stream('/tracks/336768726').then(function(player){
//    console.log(player);
//    console.log(player.getState());
//    player.seek(2000);
//    console.log(player.currentTime());
//    // does something when the track is done playing
//   player.on("finish", function(){
//     // this executes when the track is done playing
//     console.log("Done-zo");
//   });
//  });

// // get some songs and then play them
// var songs = [];
// var currentSong = 0;
// // load track objects into songs array
// SC.get("/tracks", {q: 'sashasashamarie'}).then(function(response) {
//    for(var i = 0; i < response.length; i++){
//      songs.push(response[i]);
//    }
//    playNext();
//   });
// function playNext() {
//  SC.stream('/tracks/' + songs[currentSong].id).then(function(player) {
//   //  // this code we use for the proof of concept
//   //  player.seek(songs[currentSong].duration - 1000);
//    // streams the track
//    player.play();
//    // does something when the track is done playing
//    player.on('finish',function(){
//    // increase currentSong by 1 and make sure that it is less than the length of the songs array and if not then play the first track again
//    if(currentSong < songs.length - 1){
//      console.log(currentSong);
//      currentSong += 1;
//    }
//    else{
//      console.log(currentSong);
//      currentSong = 0;
//    }
//
//    // call itself and plays the next track
//    playNext();
//  });
//  });
// }

// // fetch a playlist
// SC.get('/playlists/333940933').then(function(response) {
//   console.log(response);
// });
