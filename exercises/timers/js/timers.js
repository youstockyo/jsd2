function boom () {
	console.log("boom");
}

var bomb = window.setTimeout(boom, 5000);

// clear timer example
function defuseBomb() {
	clearTimeout(bomb);
}

// interval setup
var i = 0;

function count() {
	i++;
	console.log("Count:", i);
}

var counter = window.setInterval(count, 4000);

function stop() {
	window.clearTimeout(counter);
}


