var streetNumber = [ "6020", "720", "5099", "1999" ],
		streetName = [ "Heinlen Court", "Deepdale Way", "Beach Park Blvd", "St. Celestine Court"],
		city = [ "San Jose", "Foster City", "Concord", "Elk Grove" ],
		state = [ "Hawaii", "California", "Oregon", "Washington"],
		postalCode = [ "95112", "95758", "94521", "95495"];


function randomNumber(array) {
	var num = Math.floor(Math.random() * array.length);
	return num;
};

var randomStreetNumber = streetNumber[randomNumber(streetNumber)];
var randomStreetName = streetName[randomNumber(streetName)];
var randomCity = city[randomNumber(city)];
var randomState = state[randomNumber(state)];
var randomPostalCode = postalCode[randomNumber(postalCode)];

var randomAddress = randomStreetNumber + " " + randomStreetName + " " + randomCity + ", " + randomState + " " + randomPostalCode;
console.log("Random Address:", randomAddress);