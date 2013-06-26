Template.selectedGroup.events({
	"click .btn": function () {
		var place = Places.find(this._id);
		place.votes += 1;
		Places.update(this._id, {$inc: {votes: 1}});
		var votedGroups = Session.get("votedGroups");
		if(votedGroups === null){
			localStorage.setItem("votedGroups", JSON.stringify([this.parentId]));
			Session.set("votedGroups", [this.parentId]);
		}
		else{
			votedGroups.push(this.parentId);
			localStorage.setItem("votedGroups", JSON.stringify(votedGroups));
			Session.set("votedGroups", votedGroups);
		}
	}
});
Template.selectedGroup.helpers({
	listPlaces: function () {
		return Places.find({parentId: this._id}, {sort: {votes: -1}});
	},
	votedAlready: function () {
		return $.inArray(this._id, Session.get("votedGroups")) != -1;
	}
});