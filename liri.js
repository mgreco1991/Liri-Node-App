var request = require("request");

var twitter = require("twitter");

var keys = require("./key.js");

var command = process.argv[2];

if (command == "movie-this"){ //
	
	var movieName = null;

		if (process.argv[3]){
			movieName = process.argv[3];
		
		}else{
			movieName = "Mr Nobody";
		}
		// Then run a request to the OMDB API with the movie specified
		 request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

	   	// If the request is successful (i.e. if the response status code is 200)
	   	if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover just the imdbRating
	    //(Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	    console.log("This movie's title is: " + JSON.parse(body).Title);
	    console.log("The movie's release date is: " + JSON.parse(body).Released);
	    console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
	    console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
	    console.log("The movie's country is: " + JSON.parse(body).Country);
	    console.log("The movie's language is: " + JSON.parse(body).Language);
	    console.log("The movie's plot is: " + JSON.parse(body).Plot);
	    console.log("The movie's actor list is: " + JSON.parse(body).Actors);

	    //console.log()

	    //var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

		// This line is just to help us debug against the actual URL.
		//console.log(queryUrl);
			}

  		}); //end of function for request
	} //end of if statement

else if (command == "my-tweets"){

	var twitterKeysObject = new twitter(keys);

	var params = {
	q: 'DragonLady9000',
	count: 20
	}; 
	twitterKeysObject.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for(var i = 0; i<20; i++){
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
        //console.log(response);        
     }
    }
  });

}else if (command == "spotify-this-song"){

	var songName = null;

	if (process.argv[3]){
	songName = process.argv[3];
	}else{
		songName = "The Sign Ace of Base";
	}
	var Spotify = require('node-spotify-api');
 
	var spotify = new Spotify({
	  id: '8be8ad75d3fe4846ad68908b8fe44f40',
	  secret: '4de0ad6923f54e5f89890b0e08a9a2ea',
	});
	 
	spotify.search({ type: 'track', query: songName }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	//console.log(JSON.stringify(data));

	console.log("Artist(s): " +data.tracks.items[0].album.artists[0].name);
    console.log("The song's name: " +data.tracks.items[0].name);
    console.log("Song preview: " +data.tracks.items[0].preview_url);
    console.log("Album: " +data.tracks.items[0].album.name);
});

}else if (command == "do-what-it-says") {

	var fs = require("fs");

	fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
    return console.log(err);
    }
    console.log(data);

    //I was unable to figure out how to get this to call specific commands
});
};



