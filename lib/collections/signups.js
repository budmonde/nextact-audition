Signups = new Mongo.Collection('signups');

Signups.allow({
	update: function(userId, signup) { return ownsSignup(userId, signup); }
});

Meteor.methods({
	signupUpdate: function (data) {
		try {
			check(Meteor.userId(), String);
		} catch (error) {
			throw new Meteor.Error('login-fail', 'Please login to sign up for a slot');
		}
		check(data, {
			slot: Array
		});
		var user = Meteor.user();
		var slotStatus = Signups.findOne({slot: data.slot});
		if (!slotStatus.userId) {
			var multSignup = Signups.findOne({userId: user._id});
			if (multSignup) {
				throw new Meteor.Error('multiple-signups', 'Cannot sign up for more than one slot');
				return {
					_id:slotStatus._id
				}
			} else {
				var userId = user._id;
			}
		} else {
			if(slotStatus.userId === user._id) {
				var userId = undefined;
			} else {
				return {
					signupNotOwned: true,
					_id: slotStatus._id
				}
			};
		};
		var updateVal = {
			userId: userId
		};
		var signupId = Signups.update({slot: data.slot}, {$set: updateVal});
		return {
			_id: signupId
		};
	}
});