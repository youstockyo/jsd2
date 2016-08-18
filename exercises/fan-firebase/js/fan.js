// Structure
// ------------------------------------------------
var form = document.querySelector('form');
var messageBoard = document.querySelector('.message-board');
var messageInput = document.querySelector('#message');
var messageTemplate = document.querySelector('#message-template');



// Setup
// ------------------------------------------------
var app = {
	messages: []
};

// Events
// ------------------------------------------------
window.addEventListener('load', refreshMessages);
form.addEventListener('submit', postMessage);


// Event Handlers
// ------------------------------------------------
function postMessage(event) {
	event.preventDefault();

	var message = {
		id: assignID(),
		content: messageInput.value,
		voteCount: '',
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


// Message storage
// ------------------------------------------------
function refreshMessages() {
	if (localStorage.getItem('app') == null) {
		return;
	}

	app = localStorage.getItem('app');
	app = JSON.parse(app);

	app.messages.forEach(createMessage);
}


function saveMessages() {
	var json = JSON.stringify(app);
	localStorage.setItem('app', json);
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