// Elements
// ----------------
var body = document.querySelector('body');
var ul = document.querySelector('ul');


// Events
// ----------------
ul.addEventListener('click', clickColor);
window.addEventListener('load', restoreColor);


function restoreColor(e) {
	// get color from local storage
	var colorScheme = localStorage.getItem('colorScheme');

	if (colorScheme == null) {
		return;
	}

	// convert JSON string back to an object so we can use it
	colorScheme = JSON.parse(colorScheme);

	// call change
	change(colorScheme.bgColor);
}


function clickColor(e) {
	// console.log('clickColor',e.target);


	// Event Delegation
	// "Return Early" if an li element was not clicked
	if (e.target.tagName != "LI") {
		return;
	}

	console.log(e.target.dataset.color);
	change(e.target.dataset.color);

	// save color to local storage
	var colorScheme = {
		bgColor: e.target.dataset.color
	};
	colorScheme = JSON.stringify(colorScheme);
	localStorage.setItem('colorScheme', colorScheme);
}


function change(color) {
	console.log('change',color);
	body.className = color;
}

