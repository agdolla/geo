
function gmaps() {
    var p = $('#map').parent();
    $('#map').remove();
    p.append('<div id="map" style="width:100%; height:300px"></div>');
    
    var myLatlng = new google.maps.LatLng(39.3, -75);
    var mapOptions = {
      zoom: 6,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    var gmaps = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    $data.initService('https://dev-open.jaystack.net/b1ec5318-29a5-4603-9e4b-f20f1bf12ba6/62b1d4fd-272c-4981-bc01-34418a67f2a5/api/mydatabase').then(function(mydatabase, factory, type) {
		mydatabase.POI.toArray(function(result) {
            result.forEach(function(g) {
    			var point = new GeoJSON(g.coord);
                point.setMap(gmaps);
            });
		});
	});
}

function leaflet() {
    var p = $('#map').parent();
    $('#map').remove();
    p.append('<div id="map" style="width:100%; height:300px"></div>');
    
    var lmap = L.map('map').setView([39.3, -75], 6);
    L.tileLayer('http://{s}.tile.cloudmade.com/003d6e8d9af14e7582b462c10e572a1a/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(lmap);
    
    $data.initService('https://dev-open.jaystack.net/b1ec5318-29a5-4603-9e4b-f20f1bf12ba6/62b1d4fd-272c-4981-bc01-34418a67f2a5/api/mydatabase').then(function(mydatabase, factory, type) {
		mydatabase.POI.toArray(function(result) {
            result.forEach(function(g) {
                L.geoJson(g.coord).addTo(lmap);
            });
		});
	});
}

document.addEventListener("deviceready", gmaps, false);

