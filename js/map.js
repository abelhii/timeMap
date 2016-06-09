var map, marker, infowindow;
var markers = [];
//initialise google map:
function initMap() {
	map = new google.maps.Map(document.getElementById('gMap'), {
		zoom: 16,
		center: {lat: 53.382207, lng: -6.598396}
	});

	var kmlOptions = {
		url: 'https://webcourse.cs.nuim.ie/~se415003/timeMap/map/maynooth_campus.kml',//'http://abelhii.com/timeMap/maynooth_campus.kml',
		suppressInfoWindows: false,
		preserveViewport: false,
		map: map
	};
	var muLayer = new google.maps.KmlLayer(kmlOptions);


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


// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
  markers = [];
}



//******************************************CREATE MARKERS******************************************************//

//for when user clicks on a specific lecture:
function placeMarker(location, title, start, end) {
  //if marker already exists, reuse it:
  if ( marker ) {
    if(markers.length > 2){
      clearMarkers();
      newMarker(location, title, start, end);
    }
    marker.setPosition(location);
    marker.setAnimation(google.maps.Animation.DROP);
  } else {
    newMarker(location, title, start, end);
  }
  //content for the info window; need to reuse code because it ovewrites the selected lecture:
  var contentString = '<div id="infoContent">'+
                        '<h3 id="firstHeading">'+title+'</h3>'+
                          '<div id="bodyContent">'+
                          '<h4>'+start+'-'+end+'</h4>'+
                          '</div>'
                      '</div>';

  //open info window on click:    
  marker.addListener('click', function() {
      infowindow.setContent(contentString);
      infowindow.open(map, marker);
      map.setCenter(marker.getPosition());
      map.setZoom(18);
  });
  //bounce on mouseover:
  marker.addListener('mouseover', function(){
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ marker.setAnimation(null); }, 1400);
  });
  marker.setIcon('https://maps.google.com/mapfiles/ms/icons/red-dot.png')
  //push onto markers array in map.js
  markers.push(marker);
}


//function to create a new marker on googlemaps:
function newMarker(location, title, start, end){
    //---To check if there are markers on the same position:---//
    //http://www.frontendfan.com/multiple-markers-with-the-exact-same-location/
    var finalLatLng = location;

    //check to see if any of the existing markers match the latlng of the new marker
    if (markers.length != 0) {
        for (i=0; i < markers.length; i++) {
            var existingMarker = markers[i];
            var pos = existingMarker.getPosition();

            //if a marker already exists in the same position as this marker
            if (location.equals(pos)) {
                //update the position of the coincident marker by applying a small multipler to its coordinates
                var newLat = location.lat() + (Math.random() -.5) / 1500;// * (Math.random() * (max - min) + min);
                var newLng = location.lng() + (Math.random() -.5) / 1500;// * (Math.random() * (max - min) + min);
                finalLatLng = new google.maps.LatLng(newLat,newLng);
            }
        }
    }
    //----------------------------------------------------------//

    marker = new google.maps.Marker({
      position: finalLatLng,
      map: map,
      title: title,
      animation: google.maps.Animation.DROP
    });

    //content for the info window:
    var contentString = '<div id="infoContent">'+
                          '<h3 id="firstHeading">'+title+'</h3>'+
                            '<div id="bodyContent">'+
                            '<h4>'+start+'-'+end+'</h4>'+
                            '</div>'
                        '</div>';

    infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    //open info window on click:   
    marker.addListener('click', function() {
      infowindow.setContent(contentString);
      infowindow.open(map, this);
    });
    marker.setIcon('https://maps.google.com/mapfiles/ms/icons/blue-dot.png');
    //push onto markers array in map.js
    markers.push(marker);
}


//****************************************************************************************************//