// Structure
// ------------------------------------------------
var form     = document.querySelector("form"),
	itemName = document.querySelector(".item-name"),
	itemDate = document.querySelector(".item-due-date"),
	list     = document.querySelector(".list");


// Setup
// ------------------------------------------------

// Firebase
var fbRef = new Firebase('https://todolist-ca66e.firebaseio.com');

var todoList = {
	"tasks": []
};


// Events
// ------------------------------------------------
window.addEventListener("load", getTodoList);
form.addEventListener("submit", addItem);


// Event Handlers
// ------------------------------------------------
function addItem(event) {
	event.preventDefault();

	// create JSON for new item
	var item = {
		name: itemName.value,
		date: itemDate.value,
		completed: false
	};

	createTodoItem(item);

	todoList.tasks.push(item);
	saveTodoList();

	form.reset();
};

function itemClicked(event) {

	var checkbox = event.target;

	todoList.tasks.forEach(updateTaskCompletedProperty);

	function updateTaskCompletedProperty(item) {
		// the span comes after the checkbox, so you can
		// use "nextSibling" (method on an Element object)"
		// to get the span element after the checkbox
		var span = checkbox.nextSibling;

		// check if this is the item in the array matching the 
		// one that was clicked by comparing the name text
		if (span.textContent === item.name) {

			// if the item in the array was found,
			// set its "completed" property in the JSON 
			// equal to the checked state of the checkbox 
			// to keep the JSON in sync with the UI
			// See the "checked" property:
			// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
			item.completed = checkbox.checked;
		}
	}

	saveTodoList();
};


// Update page functions
// ------------------------------------------------
function createTodoItem(item) {    
	// Step 1: create new html
	// ----------------------------------------------------------------
	var li       = document.createElement("li"),
		label    = document.createElement("label"),
		checkbox = document.createElement("input"),
		span     = document.createElement("span");


	// Step 2: add event listeners, attributes, and content to new html
	// ----------------------------------------------------------------
	span.textContent = item.name;
	checkbox.setAttribute("type", "checkbox");
	if (item.completed) {
		checkbox.setAttribute("checked", true);
	}

	// make each item clickable to update the "completed" property
	checkbox.addEventListener("click", itemClicked);


	// Step 3: add new html to DOM
	// ----------------------------------------------------------------
	li.appendChild(label);
	label.appendChild(checkbox);
	label.appendChild(span);

	// Optionally, add a due date if one was set
	if (item.date !== undefined && item.date.length > 0) {
		var time = document.createElement("time");
		time.textContent = "(" + item.date + ")";
		li.appendChild(time);
	}

	list.appendChild(li);
};


// Firebase functions
// ------------------------------------------------
function dataChanged(snapshot) {
	// error checking:
	// check for null/empty database
	if (snapshot.val() === null) {
		return;
	}
	
	// get the json from firebase snapshot
	todoList = snapshot.val();
	// reset the page
	list.innerHTML = '';
	// update page with tasks from firebase
	todoList.tasks.forEach(createTodoItem);
}


function getTodoList() {
	fbRef.on('value', dataChanged);
};


function saveTodoList() {
	// save json to firebase
	fbRef.set(todoList);
};
