//function for the songs info
  //should capitalize the name of the function
  //in the () are the parameters
// function Song(name, author, genre, art, url){
//   this.name = name;
//   this.genre = genre;
//   this.author = author;
//   this.art = art;
//   this.src = url;
// };
var tracks = [];

// $.getJSON("https://api.soundcloud.com/tracks/78995489.json?client_id=fd4e76fc67798bfa742089ed619084a6",
//     function( data ) {
//         console.log(data);
// });




//Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://api.soundcloud.com/tracks/78995489?format=json&client_id=fd4e76fc67798bfa742089ed619084a6. (Reason: CORS preflight channel did not succeed).

//use jsonp
// $.ajax({
//   type: "GET",
//   crossDomain: true,
//   jsonp: "callback",
//   dataType: 'jsonp',
//   url: 'https://api.soundcloud.com/tracks/78995489.json?client_id=fd4e76fc67798bfa742089ed619084a6',
//   success: function(response){
//     console.log(response);
//   }
// })
// <iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/78995489&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true"></iframe>

// function getJSONP(url, success) {
//     var ud = '_' + +new Date,
//         script = document.createElement('script'),
//         head = document.getElementsByTagName('head')[0]
//                || document.documentElement;
//     window[ud] = function(data) {
//         head.removeChild(script);
//         success && success(data);
//     };
//     script.src = url.replace('callback=?', 'callback=' + ud);
//     head.appendChild(script);
// }
// getJSONP('http://soundcloud.com/oembed?url=http%3A//soundcloud.com/david-butterfield-music/to-the-stars-ft-liam-brien%20&format=js&callback=?', function(data){
//     console.log(data);
// });







 //main class jukebox
 class soundCloud{
   //if the global variable is defined up here then it can be refrenced in other places and 'this' would not be needed in the code for these values

   constructor(){
    //list of the songs I have and any new songs that they upload

    // var jsonp = 'http://soundcloud.com/oembed?url=http%3A//soundcloud.com/david-butterfield-music/to-the-stars-ft-liam-brien%20&format=js&callback=?';



    //play track based on id
    this.currentTrack = 78995489;
   }

   getJSONP(url, success) {
       var ud = '_' + +new Date,
           script = document.createElement('script'),
           head = document.getElementsByTagName('head')[0]
                  || document.documentElement;
       window[ud] = function(data) {
           head.removeChild(script);
           success && success(data);
       };
       script.src = url.replace('callback=?', 'callback=' + ud);
       head.appendChild(script);
   }

   init(){
     //initialize sound cloud
     SC.initialize({
       client_id: 'fd4e76fc67798bfa742089ed619084a6',
       redirect_uri: 'http://example.com/callback'
     });
   }

   stream(){
     SC.stream("/tracks/78995489").then(function(player){
         tracks = player;
         //console.log(player);

        // streams the track
        player.play();
        $('#PlayBtn').hide();
        $('#PauseBtn').show();

        $('#PlayBtn').click(function(){
          player.play();
          $(this).hide();
          $('#PauseBtn').show();
        });
        $('#PauseBtn').click(function(){
          player.pause();
          $(this).hide();
          $('#PlayBtn').show();
        });
        $('#StopBtn').click(function(){
          player.pause();
          player.seek(0);
          $('#PauseBtn').hide();
          $('#PlayBtn').show();
        });
        displaySongs();
      });

   }

  //this displays the tracks on the page as a method
  displaySongs(){
    $('#playlist').html('');
    //currentTrack = this.currentTrack;

    for(var i = 0; i < tracks.length; i++){
      this.tracks.push(tracks[i]);
    }

    SC.get("/tracks/"+ this.currentTrack).then(function(player){
      tracks = player;
      console.log('Latest track: ' + tracks.title);
      console.log('Latest track: ' + tracks.permalink_url);
      //authors do not exist in the SC
      // console.log('Latest track: ' + tracks[this.currentTrack].full_name);
      console.log('Latest track: ' + tracks.artwork_url);

      // SC.oEmbed(track.permalink_url, document.getElementById('playlist'));

      //try rewriting it as a promise and storing the data to display when it runs
      //that should be in here
      //$('#playlist').html('<img src="' + tracks.artwork_url + '"/>'+ '<h5 id="song_' + this.currentTrack + '">' + tracks.title + ' <a href=' + tracks.permalink_url + '>' + '</a> <br/> Genre: ' +  tracks.genre + '</h5>');

    });

    $('#playlist').html('<img src="' + tracks.artwork_url + '"/>'+ '<h5 id="song_' + this.currentTrack + '">' + tracks.title + ' <a href=' + tracks.permalink_url + '>' + '</a> <br/> Genre: ' +  tracks.genre + '</h5>');

    // var promise = new Promise(function(resolve, reject){
    //   SC.get("/tracks/"+ this.currentTrack).then(function(player){
    //     tracks = player;
    //     console.log('Latest track: ' + tracks.title);
    //     console.log('Latest track: ' + tracks.permalink_url);
    //     //authors do not exist in the SC
    //     // console.log('Latest track: ' + tracks[this.currentTrack].full_name);
    //     console.log('Latest track: ' + tracks.artwork_url);
    //
    //
    //     //try rewriting it as a promise and storing the data to display when it runs
    //     //that should be in here
    //     //$('#playlist').html('<img src="' + tracks.artwork_url + '"/>'+ '<h5 id="song_' + this.currentTrack + '">' + tracks.title + ' <a href=' + tracks.permalink_url + '>' + '</a> <br/> Genre: ' +  tracks.genre + '</h5>');
    //
    //     resolve(tracks);
    //   });
    //   $('#playlist').html('<img src="' + tracks.artwork_url + '"/>'+ '<h5 id="song_' + this.currentTrack + '">' + tracks.title + ' <a href=' + tracks.permalink_url + '>' + '</a> <br/> Genre: ' +  tracks.genre + '</h5>');
    //
    // });
    //
    // return promise;



    //$('#playlist').html( '<img src="' + tracks[this.currentTrack].artwork_url + '"/>'+ '<h5 id="song_' + this.currentTrack + '">' + tracks[this.currentTrack].name + ' by <a href=' + tracks[this.currentTrack].permalink_url + '>' + '</a>' +  tracks[this.currentTrack].genre + '</h5>');

    // for (var i = 0; i < tracks.length; i++) {
    //     $('#playlist').html( '<img src="' + tracks[i].avatar_url + '"/>'+ '<h5 id="song_' + i + '">' + tracks[i].name + ' by <a href=' + tracks[i].permalink_url + '>' + '</a>' +  tracks[i].genre + '</h5>');
    //   }

  }

  // displaySongs(){
  //   var songEl = document.createElement('div');
  //   var link = document.createElement('a');
  //   link.href = tracks.permalink_url;
  //   var text = document.createTextNode(tracks.title + ', ' + tracks.genre);
  //   link.appendChild(text);
  //   songEl.appendChild(link);
  //
  //   document.getElementById('playlist').appendChild(songEl);
  // }

  playsong(){
    SC.stream( "/tracks/"+ this.currentTrack ).then(function(player){
      tracks = player;
      $('#PlayBtn').hide();
      $('#PauseBtn').show();
    	player.play();
      	player.on("finish",function(){
          this.currentTrack ++;
        });
    });
  }

  //this is a method
  pause(){
    SC.stream( "/tracks/"+ this.currentTrack ).then(function(player){
      tracks = player;
      $('#PauseBtn').hide();
      $('#PlayBtn').show();
    	player.pause();
      	player.on("finish",function(){
          this.currentTrack ++;
        });
    });
  }

  //this is a method
  stop(){
    SC.stream( "/tracks/"+ this.currentTrack ).then(function(player){
      tracks = player;
      $('#PauseBtn').hide();
      $('#PlayBtn').show();
    	player.pause();
      player.seek(0);
      	player.on("finish",function(){
          this.currentTrack ++;
        });
    });
  }

  // search(){
  //   currentTrack = this.value;
  //   SC.get("/tracks/" + currentTrack).then(function(response) {
  //     SC.player.pause();
  //     SC.player.seek(0);
  //     SC.player.play();
  //   });
  // }
 }

function init(){
  //instance of jukebox
  //be careful of the spelling to make sure it is the same throughout all of the times it is called
  //usually the items are lowercase and have an upperCase later in the word
  var SoundCloud = new soundCloud();

  SoundCloud.getJSONP('http://soundcloud.com/oembed?url=http%3A//soundcloud.com/david-butterfield-music/to-the-stars-ft-liam-brien%20&format=js&callback=?', function(data){
      console.log(data);
  });

  SoundCloud.init();

  SoundCloud.stream();

 //plays on page load
 SoundCloud.playsong();

 //displays the names
 SoundCloud.displaySongs();

 //SoundCloud.search();

 // $('#search').change(function(){
 //   currentTrack = this.value;
 //   SC.get("/tracks", currentTrack).then(function(player) {
 //    //console.log(player);
 //    SoundCloud.stop();
 //    $('#PlayBtn').hide();
 //    $('#PauseBtn').show();
 //    SoundCloud.play();
 //   });
 // });
};

init();
