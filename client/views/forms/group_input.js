Template.groupInput.events({
	"click input.createGroup": function () {
		Groups.insert({name: $(".groupName").val()});
	}
});