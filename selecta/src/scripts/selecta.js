// Setup
//---------------------------
var audio = new Audio();
var trackDetails = [];
var trackURLs = [];
var trackIndex = 0;

SC.initialize({
	client_id: 'a6fd7031f106d30cca0acc1b77431c13'
});



// Structure
//---------------------------
var form       = document.querySelector('form');
var genreGroup = document.querySelectorAll('input[name=genre-group]');
var djPool     = document.querySelectorAll('.dj-pool');
var play       = document.querySelector('.play');
var pause      = document.querySelector('.pause');
var next       = document.querySelector('.next');


// Events
//---------------------------
form.addEventListener('submit', makePlaylist);
audio.addEventListener('ended', playNextTrack);
audio.addEventListener('error', skipTrack);
next.addEventListener('click', playNextTrack);
play.addEventListener('click', function() {
	audio.play();
});
pause.addEventListener('click', function() {
	audio.pause();
});



// Playlist Construction
//---------------------------
function makePlaylist(e) {
	e.preventDefault();

	var djs = [];
	var poolTracks = [];
	var finalPlaylist;

	// Safari does not allow forEach method on a nodeList (djPool),
	// convert djPool to an array
	djPoolArray = [].slice.call(djPool);

	// Get selected DJs, push the selection(s)
	// to the djs array
	djPoolArray.forEach(isChecked);
	function isChecked(i) {
		if (i.checked) {
			djs.push(i.value);
		}
	}

	console.log('DJs:', djs);

	// Get each selected DJs playlist and push
	// those tracks to the poolTracks array
	djs.forEach(getPoolTracks);
	function getPoolTracks(i) {
		poolTracks.push(wavy[i]);

		// Flatten poolTracks as it is initially
		// an array of arrays
		poolTracks = [].concat.apply([], poolTracks);

		// Shuffle the poolTracks playlist
		poolTracks.sort(shuffle);

		// The first 12 tracks of poolTracks
		// will be the final playlist
		finalPlaylist = poolTracks.slice(0, 12);
	}

	console.log('finalPlaylist: playlist created', finalPlaylist);

	// get track details
	finalPlaylist.forEach(pushTrackDetails);
	function pushTrackDetails(trackID) {
		var url = 'http://api.soundcloud.com/tracks/' + trackID + '?client_id=a6fd7031f106d30cca0acc1b77431c13';
		$.getJSON(url, compileTrackDetails)
		.fail(function() { console.log('getjson error'); });
	}

	function compileTrackDetails(json) {
		// save track details in trackDetails array
		trackDetails.push(json);
		// save streaming urls for each track in trackURLs array
		trackURLs.push(json.stream_url + '?client_id=a6fd7031f106d30cca0acc1b77431c13');
	}

	console.log('trackDetails', trackDetails);
	console.log('trackURLs', trackURLs);

	// wait a bit before playing the first track
	// (the player tries to load before
	// trackURLs is done compiling)
	setTimeout(initialPlay, 500);
}


// Audio player
//---------------------------
function initialPlay() {
	audio.setAttribute('src', trackURLs[0]);
	audio.load();
	audio.play();
	console.log('trackIndex', trackIndex);
}

// Play next track when current track is finished playing
function playNextTrack() {
	var trackCount = trackURLs.length;

	// Continue to next song
	if ((trackIndex + 1) < trackCount) {
		trackIndex = trackIndex + 1;
		audio.setAttribute('src', trackURLs[trackIndex]);
		audio.load();
		audio.play();
		console.log('trackIndex', trackIndex, 'trackCount', trackCount);
	} else {
		audio.pause();
		trackIndex = 0;
		audio.setAttribute('src', trackURLs[trackIndex]);
		audio.load();
		console.log('trackIndex', trackIndex, 'trackCount', trackCount);
	}
	
}

// Error handling
// If a track can't be played, skip to the next one
function skipTrack() {
	console.log('error playing track');
	trackIndex = trackIndex + 1;
	console.log('trackIndex', trackIndex);
	audio.setAttribute('src', trackURLs[trackIndex]);
	audio.load();
	audio.play();
}


// Track details
//---------------------------






// Helper functions
//---------------------------
// Simple shuffle
function shuffle() {
	return 0.5 - Math.random();
}

