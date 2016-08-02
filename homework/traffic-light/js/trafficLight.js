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

	// Turn off other lights
	slowLight.classList.remove('slow');
	goLight.classList.remove('go');
	slowLight.classList.remove('caution');

	// Disable caution timer
	clearInterval(cautionLight);
}

function slow() {
	slowLight.classList.toggle('slow')

	// Turn off other lights
	stopLight.classList.remove('stop');
	goLight.classList.remove('go');
	slowLight.classList.remove('caution');

	// Disable caution timer
	clearInterval(cautionLight);
}

function go() {
	goLight.classList.toggle('go');

	// Turn off other lights
	stopLight.classList.remove('stop');
	slowLight.classList.remove('slow');
	slowLight.classList.remove('caution');

	// Disable caution timer
	clearInterval(cautionLight);
}

function caution() {
	slowLight.classList.toggle('caution');
}

function cautionFlash() {
	cautionLight = setInterval(caution, 700);

	// Turn off other lights
	stopLight.classList.remove('stop');
	slowLight.classList.remove('slow');
	goLight.classList.remove('go');
}
