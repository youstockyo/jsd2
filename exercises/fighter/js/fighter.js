// Vocab to learn:
// 1. constructor
// 2. prototype
// 3. new
// 4. this

// Constructor
var Fighter = function(name) {
	this.name = name;
	this.punch = function() {
		alert(this.name + ' punches');
	}
}