Signups = new Mongo.Collection('signups');

Signups.allow({
	insert: function() {
		return true;
	}
})