//function for the songs info
  //should capitalize the name of the function
  //in the () are the parameters
function Song(name, author, genre, art, url){
  this.name = name;
  this.genre = genre;
  this.author = author;
  this.art = art;
  this.src = url;
};
var tracks = [];
//play track based on id
var currentTrack = 336768726;


 //main class jukebox
 class soundCloud{
   //if the global variable is defined up here then it can be refrenced in other places and 'this' would not be needed in the code for these values

   constructor(){
    //list of the songs I have and any new songs that they upload
   }

   init(){
     //initialize sound cloud
     SC.initialize({
       client_id: 'fd4e76fc67798bfa742089ed619084a6',
       redirect_uri: 'http://example.com/callback'
     });
   }

   stream(){
     SC.stream("/tracks/336768726").then(function(player){
         tracks = player;
         console.log(player);
        // streams the track
        player.play();

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
        playSong();
      });
   }

  //this displays the tracks on the page as a method
  displaySongs(currentTrack){
    $('#playlist').html('');
    currentTrack = this.currentTrack;
    SC.get("/tracks/"+ currentTrack).then(function(player){
      tracks = player;
      console.log('Latest track: ' + tracks[currentTrack].title);
      console.log('Latest track: ' + tracks[currentTrack].permalink_url);
      //authors do not exist in the SC
      // console.log('Latest track: ' + tracks[currentTrack].full_name);
      console.log('Latest track: ' + tracks[currentTrack].avatar_url);

      $('#playlist').html( '<img src="' + tracks[currentTrack].avatar_url + '"/>'+ '<h5 id="song_' + currentTrack + '">' + tracks[currentTrack].name + ' by <a href=' + tracks[currentTrack].permalink_url + '>' + '</a>' +  tracks[currentTrack].genre + '</h5>');
    });

    // for (var i = 0; i < tracks.length; i++) {
    //     $('#playlist').html( '<img src="' + tracks[i].avatar_url + '"/>'+ '<h5 id="song_' + i + '">' + tracks[i].name + ' by <a href=' + tracks[i].permalink_url + '>' + '</a>' +  tracks[i].genre + '</h5>');
    //   }


  }

  // displaySongsResult(tracks){
  //   var songEl = document.createElement('div');
  //   var link = document.createElement('a');
  //   link.href = song.permalink_url;
  //   var text = document.createTextNode(song.title);
  //   link.appendChild(text);
  //   songEl.appendChild(link);
  //
  //   document.getElementById('soundcloud').appendChild(songEl);
  // }

  playsong(){
    SC.stream( "/tracks/"+ this.currentTrack ).then(function(player){
      tracks = player;
    	player.play();
      	player.on("finish",function(){
          this.currentTrack ++;
        });
    });
  }

  //this is a method
  // play(){
  //   SC.player.play();
  // }

  //this is a method
  pause(){
    SC.stream( "/tracks/"+ this.currentTrack ).then(function(player){
      tracks = player;
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

  SoundCloud.init();

  //displays the names
  SoundCloud.displaySongs();

  SoundCloud.stream();

 //plays on page load
 SoundCloud.playsong();

 //SoundCloud.search();

 $('#PlayBtn').hide();
 $('#PauseBtn').show();

 //button click information for what should happen and show
 $('#PlayBtn').click(function(){
   SoundCloud.playsong();
   $(this).hide();
   $('#PauseBtn').show();
 });

 $('#PauseBtn').click(function(){
   SoundCloud.pause();
   $(this).hide();
   $('#PlayBtn').show();
 });

 $('#StopBtn').click(function(){
   SoundCloud.stop();
   $('#PauseBtn').hide();
   $('#PlayBtn').show();
 });

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
