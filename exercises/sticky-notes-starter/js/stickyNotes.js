console.log('hello sticky notes');

var container = document.querySelector('.container');
var button = document.querySelector('button');
var boxColor = document.querySelector('.box-color');
var boxNote = document.querySelector('.box-note');


window.addEventListener('load', function() {
	// init the sticky note count
	var noteCount = 1;

	button.addEventListener('click', function() {
		console.log('button clicked');

		// Get data from user
		var color = boxColor.value;
		var note = boxNote.value;

		// create elements
		var box = document.createElement('div');

		// add content/attributes
		box.className = 'box';
		box.innerHTML = noteCount + '. ' + note;
		box.style.backgroundColor = color;

		// Append to DOM
		container.appendChild(box);

		noteCount++
	});
	
})

