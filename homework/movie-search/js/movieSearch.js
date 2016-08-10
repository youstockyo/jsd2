// Setup
// ----------------------------------------------


// Structure
// ----------------------------------------------
var form = document.querySelector('form');
var search = document.querySelector('.search');
var results = document.querySelector('.results');
var details = document.querySelector('.details');
var detailsPoster = document.querySelector('.poster');
var detailsTitle = document.querySelector('.title');
var detailsPlot = document.querySelector('.plot');
var detailsRating = document.querySelector('.imdb-rating');
var detailsLink = document.querySelector('.imdb-link');


// Events
// ----------------------------------------------
form.addEventListener('submit', searchMovies);
results.addEventListener('click', movieDetails)


// Event handlers
// ----------------------------------------------
function searchMovies(event) {
	event.preventDefault();

	// Get value of the form input
	var movie = search.value;

	// Set API request URL
	var url = 'https://www.omdbapi.com/?s=' + movie;

	// If the search term is valid, make the API request
	if (movie != '') {
		search.classList.remove('error');
		// Hide placeholder details div
		details.classList.add('hide');
		$.getJSON(url, searchResults);
	} else {
		search.classList.add('error');
		search.setAttribute('placeholder', 'Please enter a movie.');
		return;
	}
	
}


// Get movie details
function movieDetails(event) {
	var target = event.target;
	if (target.tagName != 'LI') {
		// The child was clicked, but we want the parent,
		// so set the target to the parent element
		target = target.parentElement;
	}

	// Show details div
	details.classList.remove('hide');

	// Use the target id (imdb id) to get data from the API 
	var url = 'https://www.omdbapi.com/?i=' + target.id;
	$.getJSON(url, displayMovieDetails)
}


// Update page
// ----------------------------------------------
// Grab the JSON data
function searchResults(json) {
	// clear old results
	results.innerHTML = '';

	// run displaySearchResults for each item in the array
	json.Search.forEach(displaySearchResults);
}


// Display movie search results
function displaySearchResults(movie) {
	var li = document.createElement('li');

	if (movie.Poster != 'N/A') {
		var liContent =
		'<img src="' + movie.Poster + '">' +
		'<p>' + movie.Title + '</p>';
	} else {
		var liContent = '<p class="is-solo">' + movie.Title + '</p>';
	}

	li.innerHTML = liContent;
	li.id = movie.imdbID;
	results.appendChild(li);
}


// Display movie details
function displayMovieDetails(movie) {
	if (movie.Poster != 'N/A') {
		detailsPoster.classList.remove('hide');
		detailsPoster.setAttribute('src', movie.Poster);
	} else {
		detailsPoster.classList.add('hide');
	}

	if (movie.imdbRating == 'N/A') {
		detailsRating.innerHTML = movie.imdbRating;
	} else {
		detailsRating.innerHTML = movie.imdbRating + '/10';
	}

	detailsTitle.innerHTML = movie.Title;
	detailsPlot.innerHTML = movie.Plot;
	detailsLink.setAttribute('href', 'https://www.imdb.com/title/' + movie.imdbID);
}