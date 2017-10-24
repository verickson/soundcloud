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

//global variables
var tracks = [];
var currentTrack = 0;
var SC;

 //main class jukebox
 class soundCloud{
   //if the global variable is defined up here then it can be refrenced in other places and 'this' would not be needed in the code for these values

   constructor(){
    //list of the songs I have and any new songs that they upload

     //play track based on id
     SC.stream("/tracks/336768726").then(function(player){
         tracks = player;
         // console.log(player);
        // streams the track
        player.play();
        //info for the track and buttons to load
        //$("#playlist").html(tracks[currentTrack].title);
        $('#playlist').html( '<img src="' + tracks[currentTrack].art + '"/>'+ '<h5 id="song_' + i + '">' + tracks[currentTrack].name + ' by ' + tracks[currentTrack].author +  tracks[currentTrack].genre + '</h5>');
      }).then(function(){
          playSong();
          $("#play").click(player.play());
          $("#pause").click(player.pause());
          $("#stop").click(player.stop());
      });
   }

   init(){
     //initialize sound cloud
     SC.initialize({
       client_id: 'fd4e76fc67798bfa742089ed619084a6',
       redirect_uri: 'http://example.com/callback'
     });
   }

  //this displays the tracks on the page as a method
  displaySongs(){
    $('#playlist').html('');

    //loop through the songs in the playlist
    for(var i=0; i < tracks.length; i++){
      //the 1 is for the index of the songs that beign played
      $('#playlist').html( '<img src="' + tracks[currentTrack].art + '"/>'+ '<h5 id="song_' + i + '">' + tracks[currentTrack].name + ' by <a href=' + tracks[currentTrack].src + '>' + tracks[currentTrack].author + '</a>' +  tracks[currentTrack].genre + '</h5>');
    }
  }

  playsong(){
    SC.stream( "/tracks/"+ currentTrack ).then(function(player){
      SC = player;
    	player.play();
      	player.on("finish",function(){
          currentTrack ++;
        });
    });
  }

  //this is a method
  // play(){
  //   SC.player.play();
  // }

  //this is a method
  pause(){
    SC.stream( "/tracks/"+ currentTrack ).then(function(player){
      SC = player;
    	player.pause();
      	player.on("finish",function(){
          currentTrack ++;
        });
    });
  }

  //this is a method
  stop(){
    // SC.player.pause();
    // SC.player.seek(0);

    SC.stream( "/tracks/"+ currentTrack ).then(function(player){
      SC = player;
    	player.pause();
      player.seek(0);
      	player.on("finish",function(){
          currentTrack ++;
        });
    });
  }

  search(){
    currentTrack = this.value;
    SC.get("/tracks/" + currentTrack).then(function(response) {
      SC.player.pause();
      SC.player.seek(0);
      SC.player.play();
    });
  }

 }

function init(){
  //instance of jukebox
  var SoundCloud = new soundCloud();

  //displays the names
  SoundCloud.displaySongs();

 //plays on page load
 SoundCloud.playsong();

 SoundCloud.search();

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

 $('#search').change(function(){
   currentTrack = this.value;
   SC.get("/tracks", currentTrack).then(function(player) {
    //console.log(player);
    SoundCloud.stop();
    $('#PlayBtn').hide();
    $('#PauseBtn').show();
    SoundCloud.play();
   });
 });
};

init();
