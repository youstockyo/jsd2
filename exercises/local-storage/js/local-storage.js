// // save strings & numbers
// localStorage.setItem('name', 'cj');
// localStorage.setItem('birthday', 1985);

// var myName = localStorage.getItem('name');
// var myBirthday = localStorage.getItem('birthday');

// var car = {
// 	make: 'BMW',
// 	model: 'X1',
// 	year: 2014
// };

// // convert object to string
// var carString = JSON.stringify(car);

// // save objects
// localStorage.setItem('car', carString);

// // retrieve object from local storage
// var myCar = localStorage.getItem('car');

// // convert JSON string to object (can be accessible with dot notation now)
// myCar = JSON.parse(myCar);



// Structure
//---------------------------
var button = document.querySelector('button');
var color = document.querySelector('.color');
var model = document.querySelector('.model');
var p = document.querySelector('p');

// Events
//---------------------------
window.addEventListener('load', updateCar);
button.addEventListener('click', saveCar);

function saveCar(event) {
	console.log('saveCar');
	console.log(color.value);

	var car = {
		model: model.value,
		color: color.value
	};

	// convert json object to string
	car = JSON.stringify(car);

	// save to local storage
	localStorage.setItem('car', car)

	updateCar();
}


// Clear data
//---------------------------
function clearCar() {
	localStorage.removeItem('car');
}


// Update page
//---------------------------
function updateCar() {
	// get object from local storage
	var car = localStorage.getItem('car');
	
	// Validation - Return early if car isn't defined
	// Useful for first time users/first app run
	if (car == null) {
		return;
	}

	// convert JSON string to object
	car = JSON.parse(car);

	p.innerHTML = car.color + " " + car.model;
}
