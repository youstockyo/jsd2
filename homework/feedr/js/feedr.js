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
var newsSource = 'espn';
var sourceJson;
var homeArticles = [];


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


// Events
//---------------------------
window.addEventListener('load', showHome);
closePopUp.addEventListener('click', togglePopUp);
articles.addEventListener('click', articlePreview);
sourcesDropdown.addEventListener('click', selectSource);
home.addEventListener('click', showDefaultSource);
search.addEventListener('click', toggleSearch);


// Event Handlers
//---------------------------
function togglePopUp(e) {
	e.preventDefault();
	popUp.classList.add('hidden');
	articlePreviewLink.classList.remove('hidden');
}

function articlePreview(e) {
	e.preventDefault();
	popUp.classList.remove('loader');
	popUp.classList.remove('hidden');
	articlePreviewContent(e);
}

function selectSource(e) {
	e.preventDefault();
	var target = e.target.closest('li');
	var i = 0;

	while (target = target.previousElementSibling) {
		i++;
	}

	newsSource = sources[i].code;
	currentSource.innerHTML = sources[i].name;
	popUp.classList.remove('hidden');
	popUp.classList.add('loader');
	getArticles(newsSource);
}

function showDefaultSource(e) {
	e.preventDefault();
	newsSource = sources[0].code;
	currentSource.innerHTML = sources[0].name;
	getArticles(newsSource);
}

function toggleSearch(e) {
	e.preventDefault();
	var target = e.target;

	if (target.tagName == 'IMG') {
		search.classList.toggle('active');
	};
}


// Access API
//---------------------------
function getArticles(newsSource) {
	var url = 'https://newsapi.org/v1/articles?source=' + newsSource + '&apiKey=' + newsKey;
	$.getJSON(url, displayArticles)
		.fail(failedGet);
}


// Display Articles
//---------------------------
// Populate articles view
function displayArticles(json) {
	main.innerHTML = '';

	var template = Handlebars.compile(articleTemplate.innerHTML);
	var articleHTML = template(json.articles);
	main.innerHTML = articleHTML;

	popUp.classList.add('hidden');

	// Copy over data to sourceJson for easy access
	sourceJson = json;
}

// Show preview
function articlePreviewContent(e) {
	// Change the click target to the closest article element
	var target = e.target.closest('article');
	var i = 0;

	// Get index of the clicked article element
	while (target = target.previousElementSibling) {
		i++;
	}

	// Populate the preview content relative to the article index
	articlePreviewTitle.innerHTML = sourceJson.articles[i].title;
	articlePreviewDesc.innerHTML = sourceJson.articles[i].description;
	articlePreviewLink.setAttribute('href', sourceJson.articles[i].url);
}

// Error messaging
function failedGet() {
	console.log('get json failed');
	popUp.classList.remove('loader');

	articlePreviewTitle.innerHTML = '¯\\_(ツ)_/¯'
	articlePreviewDesc.classList.add('error');
	articlePreviewDesc.innerHTML = 'Oops, we can\'t load that feed right now.';
	articlePreviewLink.classList.add('hidden');
}


function getHomeArticles(newsSource) {
	var url = 'https://newsapi.org/v1/articles?source=' + newsSource + '&apiKey=' + newsKey;
	$.getJSON(url, displayHomeArticles);
}

function displayHomeArticles(json) {
	console.log('displayHomeArticles', json.articles);
	homeArticles.push(json.articles);
	homeArticles = [].concat.apply([], homeArticles);

	
}

// Consolidated home view
function showHome() {
	getArticles(newsSource);
	// forEach source call getArticles()
	sources.forEach(getSource);

	function getSource(i) {
		var grabIt = getHomeArticles(i.code);

		console.log(i.code);
	}
}


// Helper functions
//---------------------------
