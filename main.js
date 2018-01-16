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

 //main class jukebox
 class soundCloud{
   //if the global variable is defined up here then it can be refrenced in other places and 'this' would not be needed in the code for these values

   constructor(){
    //list of the songs I have and any new songs that they upload

    //play track based on id
    this.currentTrack = 78995489;
   }

   init(){
     //initialize sound cloud
     SC.initialize({
       // client_id: 'fd4e76fc67798bfa742089ed619084a6',
       client_id: 'ebe2d1362a92fc057ac484fcfb265049',
       redirect_uri: 'http://example.com/callback'
     });
   }

   stream(){
     SC.stream("/tracks/78995489").then(function(player){
         // tracks = player;
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
    // $('#playlist').html('');
    //currentTrack = this.currentTrack;

    // for(var i = 0; i < tracks.length; i++){
    //   this.tracks.push(tracks[i]);
    // }
    var current = this.currentTrack;

    SC.get("/tracks/"+ current).then(function(tracks){
      // tracks = player;
      console.log('Latest track: ' + tracks.title);
      console.log('Latest track: ' + tracks.permalink_url);
      //authors do not exist in the SC
      // console.log('Latest track: ' + tracks[this.currentTrack].full_name);
      console.log('Latest track: ' + tracks.artwork_url);



      // You have to store the results in a variable first
      var title = tracks.title,
          artwork_url = tracks.artwork_url,
          permalink_url = tracks.permalink_url,
          genre = tracks.genre,
          c = current;


      //storing the variables allowed them to be pulled in the code inside the get function.
      $('#playlist').html('<img src="' + artwork_url + '"/>'+ '<h5 id="song_' + c + '"> <a href=' + permalink_url + '>' + title + '</a> <br/> Genre: ' +  genre + '</h5>');

    });
    // debugger;
    // $('#playlist').html('<img src="' + tracks.artwork_url + '"/>'+ '<h5 id="song_' + this.currentTrack + '">' + tracks.title + ' <a href=' + tracks.permalink_url + '>' + '</a> <br/> Genre: ' +  tracks.genre + '</h5>');

  }

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
