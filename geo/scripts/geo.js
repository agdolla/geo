
function reset() {
	var p = $('#map').parent();
	$('#map').remove();
	p.append('<div id="map" style="width:100%; height:600px"></div>');
}

function gmaps() {
	reset();
    
	var myLatlng = new google.maps.LatLng(47, 19.5);
	var mapOptions = {
		zoom: 9,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	}
	var gmaps = new google.maps.Map(document.getElementById("map"), mapOptions);
    
	$data.initService('https://dev-open.jaystack.net/b1ec5318-29a5-4603-9e4b-f20f1bf12ba6/62b1d4fd-272c-4981-bc01-34418a67f2a5/api/mydatabase').then(function(mydatabase, factory, type) {
		mydatabase.POI.toArray(function(result) {
			result.forEach(function(g) {
                // FIXME remove this
                var z = g.coord.coordinates[1];
                g.coord.coordinates[1] = g.coord.coordinates[0];
                g.coord.coordinates[0] = z;
				var point = new GeoJSON(g.coord);
				point.setMap(gmaps);
			});
		});
	});
}

function leaflet() {
	reset();
    
	var lmap = L.map('map').setView([47, 19.5], 6);
	L.tileLayer('http://{s}.tile.cloudmade.com/003d6e8d9af14e7582b462c10e572a1a/997/256/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom: 18
	}).addTo(lmap);
    
	$data.initService('https://dev-open.jaystack.net/b1ec5318-29a5-4603-9e4b-f20f1bf12ba6/62b1d4fd-272c-4981-bc01-34418a67f2a5/api/mydatabase').then(function(mydatabase, factory, type) {
		mydatabase.POI.toArray(function(result) {
			result.forEach(function(g) {
                // FIXME remove this
                var z = g.coord.coordinates[1];
                g.coord.coordinates[1] = g.coord.coordinates[0];
                g.coord.coordinates[0] = z;
				L.geoJson(g.coord).addTo(lmap);
			});
		});
	});
    
	lmap.on('click', function(e) {
		console.log(e.latlng);
	});
}

function bing() {
	reset();
    
	var map = new Microsoft.Maps.Map(document.getElementById("map"), {
		credentials:"Atd8CWPKxSHmPULXiBlfYEnMhN4QPBQ03cEWU_jAYG3DB_mSFrz_dgNikeb6PEyu",
		center: new Microsoft.Maps.Location(39.3, -75),
		mapTypeId: Microsoft.Maps.MapTypeId.road,
		zoom: 6
	});
    
	$data.initService('https://dev-open.jaystack.net/b1ec5318-29a5-4603-9e4b-f20f1bf12ba6/62b1d4fd-272c-4981-bc01-34418a67f2a5/api/mydatabase').then(function(mydatabase, factory, type) {
		mydatabase.POI.toArray(function(result) {
			result.forEach(function(g) {
				//var loc = new Microsoft.Maps.Location(g.coord.coordinates[1], g.coord.coordinates[0]);
                var loc = new Microsoft.Maps.Location(g.coord.coordinates[0], g.coord.coordinates[1]);
				var pin = new Microsoft.Maps.Pushpin(loc); 
				map.entities.push(pin);
			});
		});
	});    
}

document.addEventListener("deviceready", gmaps, false);