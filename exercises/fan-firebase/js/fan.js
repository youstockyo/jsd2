// Structure
// ------------------------------------------------
var form = document.querySelector('form');
var messageBoard = document.querySelector('.message-board');
var messageInput = document.querySelector('#message');
var messageTemplate = document.querySelector('#message-template');



// Setup
// ------------------------------------------------
var fbRef = new Firebase('https://fanpage-20dda.firebaseio.com/');

var app = {
	messages: []
};

// Events
// ------------------------------------------------
window.addEventListener('load', refreshMessages);
form.addEventListener('submit', postMessage);
messageBoard.addEventListener('click', messageAction);


// Event Handlers
// ------------------------------------------------
function postMessage(event) {
	event.preventDefault();

	var message = {
		id: assignID(),
		content: messageInput.value,
		voteCount: 0,
		voteUp: 0,
		voteDown: 0,
		dateCreated: getPostDate()
	}

	app.messages.push(message);
	createMessage(message);
	saveMessages();

	form.reset();
}


function createMessage(message) {
	// Handlebars work
	var template = Handlebars.compile(messageTemplate.innerHTML);
	var templateHTML = template(app.messages);
	messageBoard.innerHTML = templateHTML;
}


function messageAction(event) {
	var target = event.target;
	if (target.classList.contains('fa-trash')) {
		deleteMessage(event);
	} else if (target.classList.contains('fa-thumbs-up')) {
		addVote(event);
	} else if (target.classList.contains('fa-thumbs-down')) {
		addVote(event);
	} else {
		return;
	}
}


// Firebase functions
// ------------------------------------------------
function dataChanged(snapshot) {
	if (snapshot.val() === null) {
		return;
	}

	app = snapshot.val();
	messageBoard.innerHTML = '';
	app.messages.forEach(createMessage);
}
function refreshMessages() {
	fbRef.on('value', dataChanged);
}


function saveMessages() {
	fbRef.set(app);
}


// Helper functions
// ------------------------------------------------
// Assign an ID to a message
function assignID() {
	var id = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	for (var i = 0; i < 8; i++) {
		id += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return id;
}


// Get timestamp for a message
function getPostDate() {
	var now = new Date();
	postDate = now.toUTCString();

	return postDate;
}


// FOR UPDATING VOTES:
// Loop through the data & if the id # of the click target parent li 
// matches the id # entry in the array, update that entry's vote counts

// Add to vote count
function addVote(event) {
	var target = event.target;

	app.messages.forEach(updateVotes);

	function updateVotes(message) {
		var id = message.id;
		var li = target.closest('li');

		if (li.id === id) {
			message.voteCount = message.voteCount + 1;

			if (target.classList.contains('fa-thumbs-up')) {
				message.voteUp = message.voteUp +1;
			} else if (target.classList.contains('fa-thumbs-down')) {
				message.voteDown = message.voteDown + 1;
			}

			saveMessages();
		}
	}
}


// Delete message
function deleteMessage(event) {
	var target = event.target;

	app.messages.forEach(deleteIt);

	function deleteIt(message) {
		var id = message.id;
		var li = target.closest('li');

		if (li.id === id) {
			console.log('delete');
		}
	}
}