// JavaScript Document

var apiKey = {
	ownerId: 'b1ec5318-29a5-4603-9e4b-f20f1bf12ba6',
	appId: '62b1d4fd-272c-4981-bc01-34418a67f2a5',
	serviceName: 'mydatabase'
};


// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
	main();
	navigator.splashscreen.hide();
}

function main() {
    var myLatlng = new google.maps.LatLng(39.3, -75);
    var mapOptions = {
      zoom: 6,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    $data.initService('https://dev-open.jaystack.net/b1ec5318-29a5-4603-9e4b-f20f1bf12ba6/62b1d4fd-272c-4981-bc01-34418a67f2a5/api/mydatabase').then(function(mydatabase, factory, type) {
		mydatabase.POI.toArray(function(result) {
            result.forEach(function(g) {
    			var point = new GeoJSON(g.coord);
                point.setMap(map);
            });
		});
	});
}
