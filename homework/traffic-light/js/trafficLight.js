// Setup
// ----------------------------------------------
var cautionLight;


// Structure
// ----------------------------------------------
var stopLight = document.querySelector('.stop-light');
var slowLight = document.querySelector('.slow-light');
var goLight = document.querySelector('.go-light');
var stopButton = document.querySelector('.stop-button');
var slowButton = document.querySelector('.slow-button');
var goButton = document.querySelector('.go-button');
var cautionButton = document.querySelector('.caution-button');



// Events
// ----------------------------------------------
stopButton.addEventListener('click', stop);
slowButton.addEventListener('click', slow);
goButton.addEventListener('click', go);
cautionButton.addEventListener('click', cautionFlash);


// Event handlers
// ----------------------------------------------
function stop() {
	stopLight.classList.toggle('stop');

	// If slow or go or caution lights are on, turn them off
	if (slowLight.classList.contains('slow') || goLight.classList.contains('go') || slowLight.classList.contains('caution')) {
		slowLight.classList.remove('slow');
		goLight.classList.remove('go');
		slowLight.classList.remove('caution');
	}

	// Disable caution timer
	clearInterval(cautionLight);
}

function slow() {
	slowLight.classList.toggle('slow')

	// If stop or go or caution lights are on, turn them off
	if (stopLight.classList.contains('stop') || goLight.classList.contains('go') || slowLight.classList.contains('caution')) {
		stopLight.classList.remove('stop');
		goLight.classList.remove('go');
		slowLight.classList.remove('caution');
	}

	// Disable caution timer
	clearInterval(cautionLight);
}

function go() {
	goLight.classList.toggle('go');

	// If stop or slow or caution lights are on, turn them off
	if (stopLight.classList.contains('stop') || slowLight.classList.contains('slow') || slowLight.classList.contains('caution')) {
		stopLight.classList.remove('stop');
		slowLight.classList.remove('slow');
		slowLight.classList.remove('caution');
	}

	// Disable caution timer
	clearInterval(cautionLight);
}

function caution() {
	slowLight.classList.toggle('caution');
}

function cautionFlash() {
	cautionLight = setInterval(caution, 700);

	// If lights are on, turn them off
	if (stopLight.classList.contains('stop') || slowLight.classList.contains('slow') || goLight.classList.contains('go')) {
		stopLight.classList.remove('stop');
		slowLight.classList.remove('slow');
		goLight.classList.remove('go');
	}
}
