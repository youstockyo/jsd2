// Setup
// ------------------------------------------
var options = {
    enableHighAccuracy: true,
    maximumAge: 3000,
    timeout: 2700,
};
var marker;

// Structure
// ------------------------------------------
var button     = document.querySelector('main button');
var locations  = document.querySelector('main .locations');
var error      = document.querySelector('main .error');
var mapElement = document.querySelector('main .map');


// Events
// ------------------------------------------
button.addEventListener('click', clickButton);


// Event Handlers
// ------------------------------------------
function clickButton(event) {
	navigator.geolocation.watchPosition(geoSuccess, geoError, options);
}


// Geolocation callback functions
// ------------------------------------------
function geoSuccess(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;

	listLocation(lat.toFixed(4), lng.toFixed(4));
	placeMarker(lat, lng);
}

function geoError(positionError) {
	error.innerHTML = 'Error: Unable to retrieve your location. ' +  positionError.code + ': ' + positionError.message;
}


// Update page functions
// ------------------------------------------
function listLocation(lat, lng) {
	var li = document.createElement('li');
	li.innerHTML = lat + ' , ' + lng;
	locations.appendChild(li);
}


// Callback when Google Maps has loaded
// ------------------------------------------
function initMap() {
	map = new google.maps.Map(mapElement, {
		center: {lat: 37.790841, lng: -122.40128},
		zoom: 9
	});
}


// Add / update the location marker
// ------------------------------------------
function placeMarker(lat, lng) {
	if (marker) {
		marker.setMap(null);
	}

	marker = new google.maps.Marker({
		map: map,
		position: {lat:lat, lng:lng}
	});

	map.setCenter(marker.getPosition());
	map.setZoom(15);
}
