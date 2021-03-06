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
var bgContainer = document.querySelector('.background-image');
var form            = document.querySelector('form');
var genreGroup      = document.querySelectorAll('input[name=genre-group]');
var djPool          = document.querySelectorAll('.dj-pool');
var playPauseButton = document.querySelector('.play-pause');
var next            = document.querySelector('.next');
var previous        = document.querySelector('.previous');
var audioPlayer     = document.querySelector('.audio-player');
var trackTitle      = document.querySelector('.track--title');
var trackUser       = document.querySelector('.track--user');


// Events
//---------------------------
form.addEventListener('submit', makePlaylist);
audio.addEventListener('ended', playNextTrack);
audio.addEventListener('error', skipTrack);
next.addEventListener('click', playNextTrack);
previous.addEventListener('click', playLastTrack);
playPauseButton.addEventListener('click', togglePlayPause);


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

	// add playing class, change copy to 'pause'
	playPauseButton.classList.add('playing');
	playPauseButton.innerHTML = 'Pause';

	// audioPlayer.style.opacity = '1';
	audioPlayer.classList.add('active');
	bgContainer.style.opacity = '0.8';
	showCurrentTrackDetails();
}

// Use playNextTrack when current track is finished playing
function playNextTrack() {
	var trackCount = trackURLs.length;

	// Continue to next song
	if ((trackIndex + 1) < trackCount) {
		trackIndex = trackIndex + 1;
		audio.setAttribute('src', trackURLs[trackIndex]);
		audio.load();
		audio.play();
		playPauseButton.classList.add('playing');
		playPauseButton.innerHTML = 'Pause';
		console.log('trackIndex', trackIndex, 'trackCount', trackCount);

		showCurrentTrackDetails();
	} else {
		audio.pause();
		playPauseButton.classList.remove('playing');
		playPauseButton.innerHTML = 'Play';
		trackIndex = 0;
		audio.setAttribute('src', trackURLs[trackIndex]);
		audio.load();
		console.log('trackIndex', trackIndex, 'trackCount', trackCount);

		showCurrentTrackDetails();
	}
	
}

function playLastTrack() {
	var trackCount = trackURLs.length;

	if ((trackIndex - 1) > -1) {
		trackIndex = trackIndex - 1;
		audio.setAttribute('src', trackURLs[trackIndex]);
		audio.load();
		audio.play();
		playPauseButton.classList.add('playing');
		playPauseButton.innerHTML = 'Pause';
		console.log('trackIndex', trackIndex, 'trackCount', trackCount);

		showCurrentTrackDetails();
	} else {
		audio.pause();
		playPauseButton.classList.remove('playing');
		playPauseButton.innerHTML = 'Play';
		trackIndex = 0;
		audio.setAttribute('src', trackURLs[trackIndex]);
		audio.load();
		console.log('trackIndex', trackIndex, 'trackCount', trackCount);

		showCurrentTrackDetails();
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
	playPauseButton.classList.add('playing');
	playPauseButton.innerHTML = 'Pause';
}


function togglePlayPause(e) {
	e.preventDefault();

	// if playing, pause the player on click
	if (playPauseButton.classList.contains('playing')) {
		audio.pause();
		playPauseButton.innerHTML = 'Play';
		console.log('pausing');
		playPauseButton.classList.remove('playing');
	} else {
		audio.play();
		playPauseButton.innerHTML = 'Pause';
		console.log('playing');
		playPauseButton.classList.add('playing');
	}
}


// Track details
//---------------------------
function showCurrentTrackDetails() {

	// display track artwork (grab the bigger size for better quality)
	var artwork = trackDetails[trackIndex].artwork_url;
	var newArtwork = artwork.replace(/-large/i, '-t500x500');
	audioPlayer.style.backgroundImage = 'url("' + newArtwork + '")';
	bgContainer.style.backgroundImage = 'url("' + newArtwork + '")';

	// display track title & artist/user
	trackTitle.innerHTML = trackDetails[trackIndex].title;
	trackUser.innerHTML = trackDetails[trackIndex].user.username;

}





// Helper functions
//---------------------------
// Simple shuffle
function shuffle() {
	return 0.5 - Math.random();
}

