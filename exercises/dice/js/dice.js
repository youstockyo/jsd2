// Structure
// ------------------------------------------
var rollButton = document.querySelector('.roll-button');
var firstDie   = document.querySelector('#first-die');
var secondDie  = document.querySelector('#second-die');


// Events
// ------------------------------------------
rollButton.addEventListener('click', rollDice);


// Event Listeners
// ------------------------------------------


/*
Creating a function named 'rollDice' where every time the user hits the "Roll Dice" button, the 
screen randomly updates the two dice. Use the html and css code included 
in the starter code folder to get started.

1) Write down pseudocode for the following program.

2) Follow the steps below to write your code.
* generate a random number between 1 - 6 and store to a variable, named 'random1'
* generate a random number between 1 - 6 and store to a variable, named 'random2'
* combine the string 'dice-' and random1 to form the random class for the first die, firstClass
* combine the string 'dice-' and random2 to form the random class for the second die, secondClass
* update the class of firstDie, using assignment, like firstDie.className =
* update the class of secondDie, using assignment, like secondDie.className = 

3) Check to see if the Dice Roll has been hit, if it has run the rollDice function.

*/

function rollDice() {
	// abstract the prefix
	var prefix = 'dice-'

	// generate random number between 1-6 + store to 'random1' & 'random2'
	var random1 = randomNumber(6,1);
	var random2 = randomNumber(6,1);

	// concat 'dice-' with firstClass & secondClass
	var firstClass = prefix + random1;
	var secondClass = prefix + random2;

	// update class of firstDie & secondDie
	firstDie.className = firstClass;
	secondDie.className = secondClass;
};



// Helper Functions
// ------------------------------------------

// Helper function for generating random number
function randomNumber(max, min) {
	var num = Math.floor(Math.random() * (max - min + min) + min);
	return num;
};

