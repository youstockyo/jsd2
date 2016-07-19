// Structure
// ------------------------------------------
var button    = document.querySelector('main button');
var addresses = document.querySelector('main .addresses');


// Events
// ------------------------------------------
button.addEventListener('click', generateAddress);


// Setup
// ------------------------------------------
// TODO: create your arrays here (street, city, state, etc)
var streetNumber = [ "6020", "720", "5099", "1999" ],
		streetName = [ "Heinlen Court", "Deepdale Way", "Beach Park Blvd", "St. Celestine Court" ],
		city = [ "San Jose", "Foster City", "Concord", "Elk Grove" ],
		state = [ "Hawaii", "California", "Oregon", "Washington" ],
		postalCode = [ "95112", "95758", "94521", "95495" ];


// Event Listeners
// ------------------------------------------
function generateAddress(e) {
	// TODO: randomly select one item from each of these arrays 
	//       and then use them to construct a random address
	var randomStreetNumber = streetNumber[randomNumber(streetNumber)];
	var randomStreetName = streetName[randomNumber(streetName)];
	var randomCity = city[randomNumber(city)];
	var randomState = state[randomNumber(state)];
	var randomPostalCode = postalCode[randomNumber(postalCode)];

	var randomAddress = randomStreetNumber + " " + randomStreetName + " " + randomCity + ", " + randomState + " " + randomPostalCode;

	addAddress(randomAddress);
}

// Helper Function(s)
// ------------------------------------------
// Generate random number
function randomNumber(array) {
	var num = Math.floor(Math.random() * (array.length - 1)) + 1;
	return num;
};


// Update page functions
// ------------------------------------------
function addAddress(address) {
	var li = document.createElement('li');
	li.innerHTML = address;
	addresses.appendChild(li);
}




