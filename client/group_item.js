Template.groupItem.events({
	"click .groupLink": function () {
		Session.set("showSelectedGroup", true);
		Session.set("selectedGroup", this);
	}
});
Template.groupItem.helpers({
	activeGroup: function () {
		if(Session.get("selectedGroup") !== undefined)
		{
			return Session.get("selectedGroup").name !== this.name;
		}else{
			return true;
		}
	}
});