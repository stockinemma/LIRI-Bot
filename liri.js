//Request keys 
//Look for keys in current folder ./

var keys = require('./keys.js');

//Look up Twitter npm packge - how does it need to be installed 

var Twitter = require('twitter');

var spotify = require('spotify');

var request = require('request');

var request = require('request');


var getMyTweets = function() {

 //Go ahead and access the first variable 'keys'
 //And out of that find the export property in my keys.js file ... twitterKeys

var client = new Twitter(keys.twitterKeys);
 
var params = {screen_name: 'stockinemma'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

    // console.log(tweets);

    //Loop through all tweets

    for(var i=0; i<tweets.length; i++) {

    	//Console log whatever tweet position we're at now,
    	//The created at attribute, a space and then whatever tweet we're on now
    	//And the text assciated with it

    	console.log(tweets[i].created_at);
    	console.log('  ');
    	console.log(tweets[i].text);

    }
  }
});

}

var getArtistNames = function(artist) {
	return artist.name
}

var getMeSpotify = function(songName) {
 
	spotify.search({ type: 'track', query: songName }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	 
	 	//console.log(data.tracks.items[0]);

	 	//Set a variable songs equal to the data track items 
	 	//Then looping through songs and pulling out all of the
	 	//Different attributes we want to didsplay

	 	var songs = data.tracks.items;
	 	for(var i=0; i=songs.length; i++) {
	 		console.log(i);
	 		console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
	 		console.log('song name: ' + songs[i].name);
	 		console.log('preview song: ' + songs[i].preview_url);
	 		console.log('album: ' + songs[i].album.name);
	 		console.log('-------------------------------------');
	 	}
	});
}



//Create switch statement to hold the different arguments from the user
//Function either runs taking in user input and using that to decide
//Which function or says LIRI doesn't know how to do that

//Added getMeSpotify inside the function ... passed it the argument songName
//Told query to input whatever is in song name inside of the search function
//During switch statement whenever the user has the case spotify-this-song it does getMeSpotify
//And passes in functionData ... which is the [3] argument from the Process argv's ...
//Which is what song the user would type after spotify-this-song and it passes into getMeSpotify as the song name

var getMeMovie = function(movieName) {

request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', 
	function (error, response, body) {
  if (!error && response.statusCode == 200) {

  	var jsonData = JSON.parse(body);

  	console.log('Title: ' + jsonData.Title);
  	console.log('Year: ' + jsonData.Year);
  	console.log('Rated: ' + jsonData.Rated);
  	console.log('IMBD Rating: ' + jsonData.imbdRating);
  	console.log('Country: ' + jsonData.Country);
  	console.log('Language: ' + jsonData.Language);
  	console.log('Pilot: ' + jsonData.Pilot);
  	console.log('Actors: ' + jsonData.Actors);
  	console.log('Rotton tomatoes rating: ' + jsonData.tomatoRating);
  	console.log('Rotton tomatoes URL: ' + jsonData.tomatoURL);

  	}
 });
}
//Use function that included a callback
//Formatted the callback function to include an error and a data argument
//That way if there is an error it will tell us and otherwise
//It will return the data
//Made sure to reference the random.txt file
var doWhatItSays = function() {
	fs.readFile('random.txt', 'utf8', function (err, data) {
  if (err) throw err;

  var dataArr = data.split(',');
//Create array based on where the comma is
//If data array length is two input two arguments
//If one just input one
  if(dataArr.length == 2) {
  	pick(dataArr[0], dataArr[1]);
  } else if (dataArr.length == 1) {
  	pick(dataArr[0]);
  }

	});
}

var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets' :
			getMyTweets();
			break;
		case 'spotify-this-song':
			getMeSpotify(functionData);
			break;
		case 'movie-this':
			getMeMovie(functionData);
		case 'do-what-it-says':
		//Just run the function
			doWhatItSays();
			break;
		default:
		console.log('LIRI does not know that');
	}
}

//Create a function that it can pass arguments into when I run pick

//Created a whole new function called runThis ...
//Its only job is to take some arguments from the user
//And pipe them into the above switch statement
var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

//Pass runThis (the function) the arguments from the user 

runThis(process.argv[2], process.argv[3]);
//process.argv is referencing whatever argument the user enters ... arguments are in an array argv 1 always node ... argv 2 alway the file to run with node 

// * Look up Spotify npm package
// * Look up npm request 


