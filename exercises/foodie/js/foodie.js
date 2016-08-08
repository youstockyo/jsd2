// Structure
// ------------------------------------
var form = document.querySelector('form');
var zip = document.querySelector('.zip');
var results = document.querySelector('.results');

// Events
// ------------------------------------
form.addEventListener('submit', getRestaurants);


// Event Handler 
// ------------------------------------
function getRestaurants(event) {
	event.preventDefault();
	// get value of the form input
	var search = zip.value;
	console.log(search);
	
	var url = 'http://opentable.herokuapp.com/api/restaurants?zip=' + search;

	$.getJSON(url, updateRestaurants);
}


// Update page
// ------------------------------------
// Grab the JSON data (a restaurant) and pass it to createRestaurant
function updateRestaurants(json) {
	console.log('updateRestaurants', json);
	// clears out old results
	results.innerHTML = '';

	// add new result for each item in array
	json.restaurants.forEach(createRestaurant);
}

// Add a restaurant to the page
function createRestaurant(restaurant) {
	var li = document.createElement('li');
	var liContent = '<img src="' + restaurant.image_url +'" alt="">';
	liContent += '<h2>' + restaurant.name + '</h2>';
	liContent += '<p>' + restaurant.address + '</p>';

	li.innerHTML = liContent;

	results.appendChild(li);
}


// Hard coded testing
//---------------------------
// var sushi = {
// 	name: 'Izakaya Gen',
// 	address: '1999 B St. San Mateo CA',
// 	image: 'http://www.tangmeister.com/081004_urasawa/11_Seared_Toro.jpg'
// };

// var grindz = {
// 	name: 'Ono Foods',
// 	address: '43 McCully St. Honolulu HI',
// 	image: 'http://pennappetit.com/wp-content/uploads/2014/01/IMG_8748-002.jpg'
// };

// var filipino = {
// 	name: 'Jollibee',
// 	address: '99 Great Mall Dr. Milpitas CA',
// 	image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Jollibee_2011_logo.svg/1045px-Jollibee_2011_logo.svg.png'
// };

// var restaurants = [];

// restaurants.push(sushi, grindz, filipino);