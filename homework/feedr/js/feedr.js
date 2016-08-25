// Setup
//---------------------------
var sources = [
	{
		name: 'ESPN',
		code: 'espn'
	},
	{
		name: 'Engadget',
		code: 'engadget'
	},
	{
		name: 'Ars Technica',
		code: 'ars-technica'
	}
];

var newsKey    = '5650db7851ef4895b2f40e5366fac400';
var sourceJson;


// Structure
//---------------------------
var popUp               = document.querySelector('#popUp');
var closePopUp          = document.querySelector('.closePopUp');
var articles            = document.querySelector('#main');
var articleTitle        = document.querySelector('.articleContent a');
var articleTemplate     = document.querySelector('#article-template');
var articlePreviewTitle = document.querySelector('#popUp h1');
var articlePreviewDesc  = document.querySelector('#popUp p');
var articlePreviewLink  = document.querySelector('#popUp .popUpAction');
var currentSource       = document.querySelector('.current-source');
var sourcesDropdown     = document.querySelector('.news-sources');
var home                = document.querySelector('.home');
var search              = document.querySelector('#search');
var searchInput         = document.querySelector('#search input');


// Events
//---------------------------
window.addEventListener('load', showHome);
home.addEventListener('click', showHome);
search.addEventListener('click', toggleSearch);
searchInput.addEventListener('keyup', filterSearch);
closePopUp.addEventListener('click', togglePopUp);
articles.addEventListener('click', displayArticlePreview);
sourcesDropdown.addEventListener('click', selectSource);


// Display Articles
// (Consolidated Home View)
//---------------------------
function showHome() {
	var homeArticles = [];
	var counter = sources.length;

	// For each source defined, make an API call
	sources.forEach(getHomeArticles);

	function getHomeArticles(newsSource) {
		var url = 'https://newsapi.org/v1/articles?source=' + newsSource.code + '&apiKey=' + newsKey;
		$.getJSON(url, compileHomeArticles)
		.fail(failedGet);
	}

	function compileHomeArticles(json) {
		// Push the data to the staging array homeArticles
		homeArticles.push(json.articles);

		// Lower the counter after each push
		// of data to homeArticles
		counter--;

		// When we've pushed from all the sources...
		if (counter == 0) {
			// Flatten homeArticles because 
			// it's initially an array of arrays
			homeArticles = [].concat.apply([], homeArticles);

			displayHomeArticles()
		}
	}

	function displayHomeArticles() {
		// Let Handlebars do its thing
		var template = Handlebars.compile(articleTemplate.innerHTML);
		var homeArticlesHTML = template(homeArticles);
		main.innerHTML = homeArticlesHTML;

		// Hide popUp overlay
		popUp.classList.add('hidden');

		// Copy the consolidated data to
		// sourceJson for easy access
		sourceJson = homeArticles;

		// Set dropdown source to 'All'
		currentSource.innerHTML = 'All';
	}
}


// Display Articles
// (Single Source View)
//---------------------------
function selectSource(e) {
	e.preventDefault();

	var target = e.target.closest('li');
	var i = 0;

	// Show loading overlay
	popUp.classList.remove('hidden');
	popUp.classList.add('loader');

	// Get index ('i') of the clicked li element
	while (target = target.previousElementSibling) {
		i++;
	}

	// Set source to clicked source
	newsSource = sources[i].code;
	currentSource.innerHTML = sources[i].name;

	// Make API call
	var url = 'https://newsapi.org/v1/articles?source=' + newsSource + '&apiKey=' + newsKey;
	$.getJSON(url, displayArticles)
	.fail(failedGet);

	// Populate articles in main section
	function displayArticles(json) {
		main.innerHTML = '';

		// Handlebars work
		var template = Handlebars.compile(articleTemplate.innerHTML);
		var articleHTML = template(json.articles);
		main.innerHTML = articleHTML;

		// Hide loading overlay
		popUp.classList.add('hidden');

		// Copy over data to sourceJson for easy access
		sourceJson = json.articles;
	}

}


// Display article preview
//---------------------------
function displayArticlePreview(e) {
	e.preventDefault();

	// Change the click target to the closest article element
	var target = e.target.closest('article');
	var i = 0;

	// Get index ('i') of the clicked article element
	while (target = target.previousElementSibling) {
		i++;
	}

	// Populate the preview content relative to the article index
	articlePreviewTitle.innerHTML = sourceJson[i].title;
	articlePreviewDesc.innerHTML = sourceJson[i].description;
	articlePreviewLink.setAttribute('href', sourceJson[i].url);

	// Show preview
	popUp.classList.remove('loader');
	popUp.classList.remove('hidden');
}


// Search
//---------------------------
function filterSearch(e) {
	e.preventDefault();

	var article = document.querySelectorAll('.article');
	var filter = searchInput.value;
	console.log('searching...', filter);
	// if (!article.innerHTML.includes(filter)) {
	// 	console.log(!article.innerHTML.includes(filter), 'going to hide')
	// 	// article.classList.add('hidden');
	// }

	// toggle search bar if enter is pressed
	if (e.keyCode == 13) {
		search.classList.toggle('active');
	}
}

function toggleSearch(e) {
	e.preventDefault();
	var target = e.target;

	if (target.tagName == 'IMG') {
		search.classList.toggle('active');
	};
}


// Close PopUp
//---------------------------
function togglePopUp(e) {
	e.preventDefault();
	popUp.classList.add('hidden');
	articlePreviewLink.classList.remove('hidden');
}


// Error messaging
//---------------------------
function failedGet() {
	console.log('get json failed');
	popUp.classList.remove('loader');

	articlePreviewTitle.innerHTML = '¯\\_(ツ)_/¯'
	articlePreviewDesc.classList.add('error');
	articlePreviewDesc.innerHTML = 'Oops, we can\'t load that feed right now.';
	articlePreviewLink.classList.add('hidden');
}


// Helper functions
//---------------------------
Handlebars.registerHelper('trimDate', function(publishedAt) {
	if (publishedAt != null) {
		return publishedAt.substring(0,10);
	} else {
		return '---';
	}
});