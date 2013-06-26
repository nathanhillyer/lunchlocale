Template.createGroupDialog.events({
	"click .cancel": function () {
		cancelDialog();
	},
	"click .save": function () {
		Groups.insert({
			name: $("#name").val(),
			latitude: Session.get("currentLatitude"),
			longitude: Session.get("currentLongitude")
		}, groupInsertCallback);
	}
});
Template.createGroupDialog.created = function () {
	getLocation();
};
Template.createGroupDialog.helpers({
	locationIsAccessible: function () {
		return Session.get("isLocationAccessible");
	}
});
function groupInsertCallback(error, id){
	var places = Session.get("currentPlaces");
	for (var i = 0; i < places.length; i++) {
		Places.insert({
			restaurant: places[i].restaurant,
			votes: places[i].votes,
			parentId: id
		});
	}
	cancelDialog();
}
function getLocation(){
	navigator.geolocation.getCurrentPosition(processLocation, handleLocationError);
}
function cancelDialog(){
	Session.set("showCreateGroupDialog", false);
}
var processLocation = function(position){
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var currentLocation = new google.maps.LatLng(latitude, longitude);
	var mapDiv = document.createElement("div");
	mapDiv.setAttribute("id", "map");
	var mapOptions = {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: currentLocation,
		zoom: 15
	};
	var map = new google.maps.Map(mapDiv, mapOptions);
	var service = new google.maps.places.PlacesService(map);

	var request = {
		location: currentLocation,
		radius: '5000',
		types: ['restaurant']
	};

	service.nearbySearch(request, placeSearchCompleted);

	Session.set("currentLatitude", latitude);
	Session.set("currentLongitude", longitude);
}
function placeSearchCompleted(results, status){
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		var places = [];
		for (var i = 0; i < results.length; i++) {
			var place = results[i];
			places[i] = {
				restaurant: place, 
				votes: 0,
				parentId: "none"
			};
		}
		Session.set("currentPlaces", places);
	}
}
function handleLocationError(errorInfo){
	Session.set("isLocationAccessible", false);
}