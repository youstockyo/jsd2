// Structure
// ------------------------------------------
var form = document.querySelector("body form");
var newThing = document.querySelector('.new-thing');
var newThingButton = document.querySelector('.new-thing-button');
var favList = document.querySelector('#fav-list');

// Events
// ------------------------------------------
form.addEventListener('submit', createNewThing);

// Event Listeners
// ------------------------------------------
function createNewThing(e) {
	e.preventDefault();
	console.log('createNewThing');
	// var newThingValue = newThing.value; (why won't this work?)
	addToList(newThing.value);
	form.reset();
}


// Update Page function
// ------------------------------------------
function addToList(newThing) {
	console.log('addToList');
	if (newThing == '') {
		alert('you must type in a value!');
	} else {
		var newListItem = document.createElement('li');
		newListItem.innerHTML = newThing;
		favList.appendChild(newListItem);
	}
}

