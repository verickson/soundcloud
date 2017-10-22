//initialize sound cloud
SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
});

// SC.stream('/tracks/' + songs[currentSong].id).then(function(player){
//   player.play();
// });

//this is the play function for the track with an ID
SC.stream('/tracks/2050462').then(function(SoundCloud){
  SoundCloud.play();
});

SC.get("/tracks").then(function(SoundCloud) {
  tracks = SoundCloud;
  $("#playlist").html(tracks[currentTrack].title);
  }).then(function(){
    SoundCloud.play();
  });
});







//function for the songs info
  //should capitalize the name of the function
  //in the () are the parameters
function Song(src, name, author, genre, art){
  this.src = src;
  this.name = name;
  this.genre = genre;
  this.author = author;
  this.art = art;
};

 //main class jukebox
 class soundCloud{
   //if the global variable is defined up here then it can be refrenced in other places and 'this' would not be needed in the code for these values
   //var tracks;

   //defines the variable within here
   constructor(){
     //everything that needs 'this' is coming from the constructor and allows you to look in the code for the value

    //list of the songs I have and any new songs that they upload
     this.tracks = [];

     //var kano = new Song('songs/y2mate.com-_hello_how_are_you_cover_by_kano_english_subs_fNB8VRwCPTM.mp3', 'Hello/ How are you (cover by Kano)', 'Kano', 'pop', '');

     this.tracks.push(kano);

     this.currentSongIndex = 0;

     //created the element audio oject to pull the play, stop, pause info
     this.player = document.createElement('AUDIO');
   }

  //this displays the tracks on the page as a method
  displaySongs(){
    $('#playlist').html('');

    //loop through the songs in the playlist
    for(var i=0; i < this.tracks.length; i++){
      //the 1 is for the index of the songs that beign played
      $('#playlist').append( '<img src="' + this.tracks[i].art + '"/>'+ '<h5 id="song_' + i + '">' + this.tracks[i].name + ' by ' + this.tracks[i].author + '</h5>');
    }
  }

  //this is a method
  addAudio(){
    this.player.src = this.tracks[0].src;
    $('#audio').append(this.player);
    this.setCurrent();
  }

  prev(){
    this.next(-1);
  }

  next(opt_val){
    this.stop();

    if (opt_val) {
        this.currentSongIndex += opt_val;
    } else {
        this.currentSongIndex++;
    }

    //this will loop through the remainder of the songs and circle back through the loop to that remainder is hit
    //modulo = %
    this.currentSongIndex = this.currentSongIndex % this.tracks.length;
    //fix for negative numbers to make them positive
    if (this.currentSongIndex < 0){
      this.currentSongIndex += this.tracks.length;
    }

    //this is how the song will get passed
    this.player.src = this.tracks[this.currentSongIndex].src;

    this.setCurrent();
    this.play();
  }

  //this is a method
  play(){
    //console.log('Now playing: ' + this.tracks[0].name);
    this.player.play();
  }

  //this is a method
  pause(){
    //console.log('Paused: ' + this.tracks[0].name);
    this.player.pause();
  }

  //this is a method
  stop(){
    //console.log('Stopped: ' + this.tracks[0].name);
    this.player.pause();
    this.player.currentTime = 0;
  }

  //this is a method
  setCurrent(){
    //clear the current song
    $('#playlist h5').removeClass('currentSong');

    $('#song_' + this.currentSongIndex).addClass('currentSong');
  }

  setSong(index){
    this.currentSongIndex = index;
    this.player.src = this.tracks[this.currentSongIndex].src;
    this.setCurrent();
    this.play();
  }

  //this is a method
  upload(t){
    // the order of this matters, it should update then display the updated song and then update the playing song

    this.stop();

    // //items to go into the song values
    // var songname = $('#Name').val();
    // var songauth = $('#Author').val();
    // var songgenre = $('#Genre').val();

    SC.upload({
      file: t.value.split('\\').pop(),
      title: $('#Name').val();
      author: $('#Author').val();
      genre: $('#Genre').val();
      albumart: ;
    });



    //this will generate the song
    //put the \\ to allow the song path to be after the split because it needs to escape the text \
    //pop gets the last item
    var newSong = new Song('songs/' + t.value.split('\\').pop(), songname, songauth, songgenre);
    this.tracks.push(newSong);
    console.log(t.value.split('\\').pop());

    //displays the song name
    this.displaySongs();

    //allows the song to be places in the code
    this.player.src = 'songs/' + t.value.split('\\').pop();
    $('#audio').append(this.player);

    //this is setting the value of the index to the last one
    this.currentSongIndex = this.tracks.length -1;

    //current song color
    this.setCurrent();

    //auto plays the song
    this.play();
    $('#PlayBtn').hide();
    $('#PauseBtn').show();

    //clear values
    $('#Name').val('');
    $('#Author').val('');
    $('#Genre').val('');
    $('#Upload').val('');


  }
 }


function init(){
  //instance of jukebox
  var SoundCloud = new soundCloud();

  //displays the names
  SoundCloud.displaySongs();

  //loads the first song to the player
  SoundCloud.addAudio();

 //plays on page load
 SoundCloud.play();

 $('#PlayBtn').hide();
 $('#PauseBtn').show();

 //button click information for what should happen and show
 $('#PlayBtn').click(function(){
   SoundCloud.play();
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

 $('#NextBtn').click(function(){
   SoundCloud.next();
   $('#PauseBtn').show();
   $('#PlayBtn').hide();
 });

 $('#PrevBtn').click(function(){
   SoundCloud.prev();
   $('#PauseBtn').show();
   $('#PlayBtn').hide();
 });

 $('#Upload').change(function(){
   $('#PauseBtn').hide();
   $('#PlayBtn').show();
   SoundCloud.upload(this);
 });

//grabs the element and do global click for any h5 inside the list
//dynamic
 $("#playlist").on('click', 'h5', function() {
   $('#PauseBtn').show();
   $('#PlayBtn').hide();

   //cuts the number of letters before that index
   //and converts the string of the index to an integer value
   var songId = parseInt($(this).attr('id').substring(5));

   SoundCloud.setSong(songId);
  });

  //allows for the next song to load when first ones finished
  $("audio").bind('ended', function(){
    SoundCloud.next();
  });
};

init();
