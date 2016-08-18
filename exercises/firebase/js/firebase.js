// Setup
//---------------------------

// Establish a connection with Firebase
var firebaseReference = new Firebase('https://jsd2-81999.firebaseio.com/');


// Elements
//---------------------------
var button = document.querySelector('button');


// Events
//---------------------------
window.addEventListener('load', restoreChanges);
button.addEventListener('click', saveChanges);


function restoreChanges(event) {
	firebaseReference.on('value', changeColor);
}


function saveChanges(event) {
	console.log('saveChanges');

	var theme = {
		color: 'red'
	}

	console.log(theme);

	// save data to firebase
	firebaseReference.set(theme);
}


function changeColor(snapshot) {
	console.log('changeColor');

	var theme = snapshot.val();
	console.log(theme);

}