Meteor.publish('posts', function() {
	return Posts.find();
});

Meteor.publish('signups', function() {
	return Signups.find();
});