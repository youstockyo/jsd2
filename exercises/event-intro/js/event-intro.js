// Setup
// --------------------------
var counter = 0;

// Structure
// --------------------------
var body = document.querySelector('body');

// Create Element
var h1 = document.createElement('h1');
h1.innerHTML = 'Events';
body.appendChild(h1);

// Create Event
var me = document.createEvent('MouseEvent');
me.initEvent('dblclick');

h1.addEventListener('dblclick', count);

function count(e) {
	counter++;
	console.log('count', counter);
	console.log(e.type);
	console.log(e.target);
}