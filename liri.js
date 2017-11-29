function userInput(){
	switch(process.argv[2]){
		case 'my-tweets':
			myTweets();
			break;
		case 'spotify-this-song':
			if(process.argv[3] === ' '){
				process.argv[3] === 'Happily';
			}
			spotifyThisSong();
			break;
		case 'movie-this':
			movieThis();
			break;
		case 'do-what-it-says':
			doWhatItSays();
			break;	}
}

var keys= require("./keys.js");

function myTweets(){

		var Twitter = require('twitter');

		var client = new Twitter({
		  consumer_key: keys.twitterKeys.consumer_key,
		  consumer_secret: keys.twitterKeys.consumer_secret,
		  access_token_key: keys.twitterKeys.access_token_key,
		  access_token_secret: keys.twitterKeys.access_token_secret
			});

	var params = {screen_name: 'averymjohnson'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			console.log("Check out my tweets!")
  			for(var i=0; i < 20; i++){
    			console.log(tweets[i].text + tweets[i].created_at);
  			}
  		}
	});
}


function spotifyThisSong(){

	if(process.argv[3] === undefined){
		process.argv[3] = "Happily";
	};

	var Spotify = require('node-spotify-api');

	var spotify = new Spotify({
		 id: keys.spotifyKeys.client_id,
		 secret: keys.spotifyKeys.client_secret
			});

	spotify.search({ type: 'track', query: process.argv[3],  limit: 1 }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}  
		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Song: " + data.tracks.items[0].name);
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("Link: " + data.tracks.items[0].external_urls.spotify); 
		
	});
}

function movieThis(){

	if(process.argv[3] === undefined){
		process.argv[3] = "She's The Man";
	};

	var request = require("request");

	request("http://www.omdbapi.com/?t="+ process.argv[3] + "&y=&plot=short&apikey=40e9cece",
	 function(error, response, body) {
  	
	  	if (!error && response.statusCode === 200) {
	    	
	    	var jsonObj = JSON.parse(body);

	    	console.log("Movie: " + jsonObj.Title);
	    	console.log("Year: " + jsonObj.Year);
	    	console.log("IMDB Rating: " + jsonObj.imdbRating);
	    	console.log("Rotten Tomatoes Rating: " + jsonObj.Ratings[1].Value);
	    	console.log("Country: " + jsonObj.Country);
	    	console.log("Language: " + jsonObj.Language);
	    	console.log("Plot: " + jsonObj.Plot);
	    	console.log("Actors: " + jsonObj.Actors);
	  	}
	});

}


function doWhatItSays(){
	var fs = require("fs");

	fs.readFile("random.txt", "utf8", function(error, data) {

	if (error) {
		return console.log(err)
	}

	console.log(data);

	var dataArr = data.split(",");
	process.argv[2] = dataArr[0];
	process.argv[3] = dataArr[1];

	console.log(dataArr);
	userInput();
})

}

userInput();