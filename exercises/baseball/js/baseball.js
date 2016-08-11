// Elements
// ------------------------------------------
var date      = document.querySelector('.date');
var games     = document.querySelector('.games');
var dateTemplate = document.querySelector('#date-template');
var gameTemplate = document.querySelector('#game-template');

// Templates
// ------------------------------------------
var template = Handlebars.compile(dateTemplate.innerHTML);
var html = template(mockdata);
date.innerHTML = html;

template = Handlebars.compile(gameTemplate.innerHTML);
html = template(mockdata.games);
games.innerHTML = html;

