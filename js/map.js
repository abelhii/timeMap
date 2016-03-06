var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('gMap'), {
		zoom: 16,
		center: {lat: 53.382207, lng: -6.598396}
	});

	var kmlOptions = {
		url: 'http://abelhii.com/timeMap/maynooth_campus.kml',
		suppressInfoWindows: false,
		preserveViewport: false,
		map: map
	};
	var muLayer = new google.maps.KmlLayer(kmlOptions);



/*
    var point = {lat: -6.60002669999998, lng: 53.3840296500001};
	var marker = new google.maps.Marker({
	    position: point,
	    map: map,
	    title: 'Hello World!'
	  });
*/


/*------------------------SEARCH BAR-----------------------------------*/
	// This example adds a search box to a map, using the Google Place Autocomplete
	// feature. People can enter geographical searches. The search box will return a
	// pick list containing a mix of places and predicted search terms.

	// Create the search box and link it to the UI element.
	var input = document.getElementById('searchMap');
	var searchBox = new google.maps.places.SearchBox(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});

	var markers = [];
	// [START region_getplaces]
	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.
	searchBox.addListener('places_changed', function() {
	var places = searchBox.getPlaces();

	if (places.length == 0) {
	  return;
	}

	// Clear out the old markers.
	markers.forEach(function(marker) {
	  marker.setMap(null);
	});
	markers = [];

	// For each place, get the icon, name and location.
	var bounds = new google.maps.LatLngBounds();
	places.forEach(function(place) {
	  var icon = {
	    url: place.icon,
	    size: new google.maps.Size(71, 71),
	    origin: new google.maps.Point(0, 0),
	    anchor: new google.maps.Point(17, 34),
	    scaledSize: new google.maps.Size(25, 25)
	  };

	  // Create a marker for each place.
	  markers.push(new google.maps.Marker({
	    map: map,
	    icon: icon,
	    title: place.name,
	    position: place.geometry.location
	  }));

	  if (place.geometry.viewport) {
	    // Only geocodes have viewport.
	    bounds.union(place.geometry.viewport);
	  } else {
	    bounds.extend(place.geometry.location);
	  }
	});
	map.fitBounds(bounds);
	});
  // [END region_getplaces]
}

/**

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}*/