Meteor.startup(function () {
	Session.set("votedGroups", JSON.parse(localStorage.getItem("votedGroups")));
});