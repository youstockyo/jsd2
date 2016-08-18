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
}

// Events
// ------------------------------------------------
// window.addEventListener('load', refreshMessages);
form.addEventListener('submit', postMessage);


// Event Handlers
// ------------------------------------------------
function postMessage(event) {
	event.preventDefault();

	var message = {
		id: '',
		content: messageInput.value,
		voteCount: '',
		dateCreated: '',
		dummyBlock: 'New post. Yes!!<i class="fa fa-trash pull-right delete"></i><i class="fa fa-thumbs-up pull-right"></i><i class="fa fa-thumbs-down pull-right"></i><div class="pull-right">0</div>'
	}

	app.messages.push(message);
	createMessage(message);
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
	console.log('refreshMessages');
}


// Helper functions
// ------------------------------------------------
// TO DO: UUID
// TO DO: Timestamp