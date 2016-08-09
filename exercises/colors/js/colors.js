// Structure
//---------------------------
var body = document.querySelector('body');
var ul = document.querySelector('ul');


// Events
//---------------------------
ul.addEventListener('click', clickColor);


// Event Handlers
//---------------------------

// 'clickColor' gets the correct event target (the li),
// then uses 'change' assigns a color class to the li
function clickColor(event) {
	// console.log('clickColor', event.target);

	// Event Delegation
	// "Return Early" if an li element isn't clicked
	if (event.target.tagName != 'LI') {
		return;
	}

	console.log(event.target.dataset.color);
	change(event.target.dataset.color);
}

function change(color) {
	console.log('change', color);
	body.className = color;
}