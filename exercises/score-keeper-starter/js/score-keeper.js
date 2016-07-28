// Setup
// --------------------------
var score = 0;

// Structure
// --------------------------
var increase = document.querySelector('#increase-5');
var decrease = document.querySelector('#decrease-5');
var scoreboard = document.querySelector('#score');
var customScore = document.querySelector('#custom-score');
var setScore = document.querySelector('#submit-custom-score');

// Click Events
// --------------------------
increase.addEventListener('click', addPoints);
decrease.addEventListener('click', minusPoints);
setScore.addEventListener('click', changeScore);


function addPoints() {
	console.log('addPoints')
	score = score + 5;
	var scoreDisplay = score + ' points';
	scoreboard.innerHTML = scoreDisplay;
}

function minusPoints() {
	console.log('minusPoints')
	if (score >= 5) {
		score = score - 5;
	} else {
		alert('You\'re not very good at this game. You can\'t have a negative score!');
	}
	
	var scoreDisplay = score + ' points';
	scoreboard.innerHTML = scoreDisplay;
}

function changeScore() {
	console.log('changeScore');
	// Check if the custom score is a number
	if ( isNaN(customScore.value) ) {
		alert('Gotta be a number, yo.')
	// Check if the custom score is a positive number
	} else if ( customScore.value < 0 ) {
		alert('Gotta be a positive number, yo.')
	// All good, enter the custom score
	} else {
		score = parseInt(customScore.value);
		var scoreDisplay = score + ' points';
		scoreboard.innerHTML = scoreDisplay;
		customScore.value = '';
	}
}