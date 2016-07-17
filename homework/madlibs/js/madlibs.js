// Setup / Data
// ------------------------------------------
var startupX = ['Uber', 'Google', 'Amazon', 'Apple', 'Facebook', 'Twitter', 'Instagram', 'AirBnB'];
var startupY = ['Slack', 'Trello', 'Tesla', 'Hyperloop', 'Harvest', 'Postmates', 'VenMo'];
var startupIdea;
var favorites = [];


// Structure
// ------------------------------------------
var startup  = document.querySelector('.startup');
var generate = document.querySelector('.generate');
var save     = document.querySelector('.save');
var print    = document.querySelector('.print');
var list     = document.querySelector('.list');


// Events
// ------------------------------------------
generate.addEventListener('click', generateStartup);
save.addEventListener('click', saveFavorite);
print.addEventListener('click', printFavorites);


// Event Listeners
// ------------------------------------------
function generateStartup() {

	// TODO: generate two random index numbers, one for each array
	function randomNumber(array) {
		var num = Math.floor(Math.random() * (array.length - 1)) + 1;
		return num;
	}; 
	var randomStartupX = startupX[randomNumber(startupX)];
	var randomStartupY = startupY[randomNumber(startupY)];

	// Concat the random startups
	startupIdea = 'A startup that is ' + randomStartupX + ', ' + 'but for ' + randomStartupY;


	// Update page with new startup idea
	startup.innerHTML = startupIdea;
}

function saveFavorite() {

	// Push idea to favorites array
	favorites.push(startupIdea);

}

function printFavorites() {
	var favoritesText = '';

	// clear out favorites element
	list.innerHTML = '';

	// Loop through the favorites, display them on their own line
	favorites.forEach(listFavorites);
	function listFavorites(i) {
		favoritesText += i + '<br>';
	};

	// update the list element with the new concatenated string
	list.innerHTML = favoritesText;
}


// Init
// ------------------------------------------
generateStartup();

