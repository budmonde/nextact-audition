Meteor.publish('signups', function() {
	return Signups.find();
});