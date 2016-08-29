// Setup
//---------------------------
var finalPlaylist;
var trackURLs = [];
var trackIndex = 0;

SC.initialize({
	client_id: 'a6fd7031f106d30cca0acc1b77431c13'
});



// Structure
//---------------------------
var form        = document.querySelector('form');
var genreGroup  = document.querySelectorAll('input[name=genre-group]');
var djPool      = document.querySelectorAll('.dj-pool');
var audioPlayer = document.querySelector('#audio-player');
var audioSource = document.querySelector('#audio-player source');


// Events
//---------------------------
form.addEventListener('submit', makePlaylist);
audioPlayer.addEventListener('ended', playNextTrack);


// Event Handlers
//---------------------------
// function mixtapeSetup(e) {
// 	e.preventDefault();
// 	makePlaylist();
// }


// Playlist Construction
//---------------------------
function makePlaylist(e) {
	e.preventDefault();

	var djs = [];
	var poolTracks = [];


	// Get selected DJs, push the selection(s)
	// to the djs array
	djPool.forEach(isChecked);
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

	console.log('playlist created', finalPlaylist);
	loadTracks();
}


function loadTracks() {

	// build an array of track urls
	finalPlaylist.forEach(finalTrackURLs);
	function finalTrackURLs(trackID) {
		var url = 'https://api.soundcloud.com/tracks/' + trackID + '/stream?client_id=a6fd7031f106d30cca0acc1b77431c13';
		trackURLs.push(url);
	}
	console.log(trackURLs);

	audioSource.setAttribute('src', trackURLs[0]);
	audioPlayer.load();
}


// Audio player
//---------------------------

// Play next track when current track is finished playing
function playNextTrack() {
	var trackCount = trackURLs.length;
	console.log('done');
	console.log('trackIndex', trackIndex, 'trackCount', trackCount);

	// Continue to next song
	if ((trackIndex + 1) < trackCount) {
		trackIndex = trackIndex + 1;
		audioSource.setAttribute('src', trackURLs[trackIndex]);
		audioPlayer.load();
		audioPlayer.play();
		console.log('trackIndex', trackIndex, 'trackCount', trackCount);
	} else {
		audioPlayer.pause();
		trackIndex = 0;
		audioSource.setAttribute('src', trackURLs[trackIndex]);
		console.log('trackIndex', trackIndex, 'trackCount', trackCount);
	}
	
}

// TODO: Error handling for when tracks can't play







// Helper functions
//---------------------------
// Simple shuffle
function shuffle() {
	return 0.5 - Math.random();
}

