// Elements
// ------------------------------------
var form = document.querySelector("form");
var zip = document.querySelector("form .zip");
var results = document.querySelector(".results");
var restaurantAvailable = document.querySelector(".restaurant-available");

var restaurantTemplate = document.querySelector("#restaurant-template");
var restaurantCount = document.querySelector("#restaurant-count");


// Event
// ------------------------------------
form.addEventListener('submit', function(event) {
	event.preventDefault();

	var search = zip.value;
	console.log(search);

	var url = "http://opentable.herokuapp.com/api/restaurants?zip=" + search;

	$.getJSON(url, function (json) {
		console.log('updateRestaurants',json);

		// clears out the old results
		results.innerHTML = '';

		// Compiling the template source from <script> tag
		// into a Handlebars template
		var template = Handlebars.compile(restaurantTemplate.innerHTML);
		var restaurantHTML = template(json.restaurants);
		results.innerHTML = restaurantHTML;

		var countTemplate = Handlebars.compile(restaurantCount.innerHTML);
		var countHTML = countTemplate(json);
		restaurantAvailable.innerHTML = countHTML;
		console.log(json.restaurants);
	});
});


// Event Handler 
// ------------------------------------


// Update page
// ------------------------------------
