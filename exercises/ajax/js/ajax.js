// Structure
//---------------------------
var p = document.querySelector('.dynamic');
var conceptsList = document.querySelector('.concepts');

// create path to ajax request
var url = "https://api.consumerfinance.gov/data/hmda.json";

// setup ajax request
var jqxhr = $.getJSON(url, handleData);

// callback function for ajax request
// ajax callbacks expect the json data
function handleData(json) {
	console.log(json);

	var description = json.description;

	p.innerHTML = description;

	// unpack json and save to variable 'concepts'
	var concepts = json['_embedded']['concepts'];
	concepts.forEach(createConcept);

	function createConcept(item) {

		// console.log('createConcept', item);
		console.log(item.description);

		// Create list item
		var li = document.createElement('li');
		// Inject item.description to list item
		li.innerHTML = item.description;
		// Append list item into conceptsList
		conceptsList.appendChild(li);
		// Set the list item ID to the concept ID property
		li.id = item.id;
	} 
}