// Setup
//---------------------------
var newsKey = '5650db7851ef4895b2f40e5366fac400';


// Structure
//---------------------------
var popUp = document.querySelector('#popUp');
var closePopUp = document.querySelector('.closePopUp');
var popUpAction = document.querySelector('.popUpAction');
var articleTitle = document.querySelector('.articleContent a');
var articleTemplate = document.querySelector('#article-template');
var articles = document.querySelector('#main');



// Events
//---------------------------
window.addEventListener('load', grabArticles)
closePopUp.addEventListener('click', togglePopUp);
articles.addEventListener('click', articlePreview);


// Event Handlers
//---------------------------
function togglePopUp(e) {
	e.preventDefault();
	popUp.classList.add('hidden');
}

function articlePreview(e) {
	e.preventDefault();
	popUp.classList.remove('loader');
	popUp.classList.remove('hidden');
	articlePreviewContent();
}


// Access API
//---------------------------
function grabArticles() {
	var url = 'https://newsapi.org/v1/articles?source=techcrunch&apiKey=' + newsKey;
	$.getJSON(url, displayArticles);
}


// Display Articles
//---------------------------
function displayArticles(json) {
	main.innerHTML = '';

	var template = Handlebars.compile(articleTemplate.innerHTML);
	var articleHTML = template(json.articles);
	main.innerHTML = articleHTML;

	popUp.classList.add('hidden');
}

function articlePreviewContent() {
	console.log('display content')
}