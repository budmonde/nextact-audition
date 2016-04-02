Meteor.publish('signups', function() {
	return Signups.find();
});

Meteor.publish("allUsers", function(){
	var user = Meteor.users.findOne({
        _id: this.userId
    });
    return Meteor.users.find({}, {
        fields: {
            emails: 1,
        }
    });
});