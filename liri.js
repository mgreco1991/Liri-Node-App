// require all necessary packages and the keys.js file

var request = require("request");

var twitter = require("twitter");

var keys = require("./key.js");

// create a variable called command that is 
// equal to the text typed after liri.js in the 
// terminal 

var command = process.argv[2];

// if the command text is equal to "movie-this"...

if (command == "movie-this"){ 

	// set a variable movieName to null by default
	
	var movieName = null;

		// if there is text following movie-this, as in the terminal:
		// node liri.js movie-this starwars...

		if (process.argv[3]){

			// the movie name becomes the text following "movie-this"

			movieName = process.argv[3];

			// if there is no text after "movie-this..."
		
		}
		else{

			// the movieName becomes "Mr Nobody," and the OMDB request
			// will return data about the movie "Mr Nobody"

			movieName = "Mr Nobody";
		}

		// Next, run a request to the OMDB API with the movie name 
		// (stored in movieName) specified
		 request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

	   	// If the request is successful (i.e. if the response status code is 200)...
	   	if (!error && response.statusCode === 200) {

	    // Parse the JSON object and console-log the following information
	    // about the movie by accessing the key-value pairs in the object
	    console.log("This movie's title is: " + JSON.parse(body).Title);
	    console.log("The movie's release date is: " + JSON.parse(body).Released);
	    console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
	    console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
	    console.log("This movie was filmed in: " + JSON.parse(body).Country);
	    console.log("The movie's language is: " + JSON.parse(body).Language);
	    console.log("The movie's plot is: " + JSON.parse(body).Plot);
	    console.log("The movie's cast is: " + JSON.parse(body).Actors);

			}

  		}); 
	} 

	// if the command is equal to the text "my-tweets"...

else if (command == "my-tweets"){

	// create an object for the twitter keys that is equal to the required 
	// twitter package and uses the required twitter keys from the key.js
	// file 

	var twitterKeysObject = new twitter(keys);

	// create an object called params that takes in a username and a tweet count of 
	// the 20 most recent tweets

	var params = {
	q: 'DragonLady9000',
	count: 20
	}; 

	// use the .get method on the twitter keys object that takes in the 
	// parameters for the URL, the params object with the username and 20
	// most recent tweets, and a callback function that takes in an error,
	// tweets, and response as its parameters 

	twitterKeysObject.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {

	// if there are no errors...

    if (!error) {

    // loop through the most recent 20 tweets...
      for(var i = 0; i < 20; i++){

      	// log the text and time stamp for each tweet
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);       
     }
    }
  });
	// if the command is "spotify-this-song"...

}else if (command == "spotify-this-song"){

	// as with "movie-this", set the variable songName equal to null by default

	var songName = null;

	// if there is text after "movie-this" in the terminal...

	if (process.argv[3]){

	// the name of the song becomes that text, as in "node liri.js 
	//spotify-this-song hello"
	songName = process.argv[3];

	// if there is no text after "spotify-this-song", retrieve the 
	// information for the song "Ace of Base"
	}else{
		songName = "The Sign Ace of Base";
	}

	// require the spotify API into the application
	var Spotify = require('node-spotify-api');

	// create an instance of Spotify using a constructor,
	// and specify (your) id and secret id 
 
	var spotify = new Spotify({
	  id: '8be8ad75d3fe4846ad68908b8fe44f40',
	  secret: '4de0ad6923f54e5f89890b0e08a9a2ea',
	});

	// use the .search method on this spotify object 
	 
	spotify.search({ type: 'track', query: songName }, function(err, data) {

	// if there is an error, say so in the terminal 

	  if (err) {
	    return console.log('Error occurred: ' + err);
	  	}
	 
	// console-log the song's information based on the key-value pairs in 
	// the JSON object (this requires some deep searching)
	console.log("Artist(s): " +data.tracks.items[0].album.artists[0].name);
    console.log("The song's name: " +data.tracks.items[0].name);
    console.log("Song preview: " +data.tracks.items[0].preview_url);
    console.log("Album: " +data.tracks.items[0].album.name);
	});

	// finally, if the command is equal to the text "do what it says..."

	}else if (command == "do-what-it-says") {

	// require fs for reading text files

	var fs = require("fs");

	// use the readFile method to read the text on the file random.txt, utf8 character
	// code, and execute a callback function that takes in an error and data as its
	// parameters

	fs.readFile("random.txt", "utf8", function(err, data) {

	// set the output of this function equal to the data (an array), 
	// split neatly by commas
  	
  	var output = data.split(",");

  	// create a function called runCommand that takes in command 
  	// as its parameter

  	function runCommand(command){

  		// if the data in the text file contains the text "spotify-this-song" 
  		// in the second index
  	if (output[2] == "spotify-this-song"){
  		
  		} 
  	}

  	for (var i = 0; i < output.length; i++) {

    console.log(output[i]);
		}
	});  
};



