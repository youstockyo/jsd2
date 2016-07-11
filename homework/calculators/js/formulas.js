
// Instructions for your homework
// //////////////////////////////////////////////////////////////////
// 1.   Here is where your functions should be defined
// 2.	 What should you name your functions?  Hint:  check the console to see which functions are already being called.  Are they all "defined?"  If not yet defined... then define them here!
// 3.	 Be sure to link up this file in your HTML doc
/////////////////////////////////////////////////////////////////////

function calcFahrenheitToCelcius(x) {
	var conversion = (x - 32) * (5/9);
	return conversion; 
};

function calcCelciusToFarenheit(x) {
	var conversion = (x * (5/9)) + 32;
	return conversion;
};

function calcCircumference(r) {
	var calculation = 2 * Math.PI * r;
	return calculation;
};

function calcLongestSide(x, y) {
	var squared = (Math.pow(x, 2) + Math.pow(y, 2));
	var rooted = Math.sqrt(squared);
	return rooted;
};