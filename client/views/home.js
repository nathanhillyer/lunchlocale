Template.home.helpers({
	showCreateGroupDialog: function () {
		return Session.get("showCreateGroupDialog");
	},
	getSelectedGroup: function () {
		return Groups.findOne(Session.get("selectedGroup"));
	},
	showSelectedGroup: function () {
		return Session.get("selectedGroup") !== null;
	}
});
Template.home.events({
	"click .createGroup": function () {
		Session.set("showCreateGroupDialog", true);
		Session.set("isLocationAccessible", true);
	}
});