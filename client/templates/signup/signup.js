var days = ['Monday', 'Tuesday', 'Wednesday'];
var slots = ['7:00PM - 7:15PM', '7:15PM - 7:30PM', '7:30PM - 7:45PM', '7:45PM - 8:00PM','8:00PM - 8:15PM', '8:15PM - 8:30PM', '8:30PM - 8:45PM', '8:45PM - 9:00PM','9:00PM - 9:15PM', '9:15PM - 9:30PM', '9:30PM - 9:45PM', '9:45PM - 10:00PM'];

Template.signup.helpers({
	slots: slots
});

Template.signup.events({
	'click .slot': function (event) {
		event.preventDefault();
    var target = $(event.target);
		var col = Number(target.attr('id').substring(0,1));
  	var row = Number(target.attr('id').substring(1));
  	var data = {
			slot: [col, row]
		};
    // if (target.hasClass('yours')) {
    //   if (confirm('Are you sure you want to delete your signup?')) {
    Meteor.call('signupUpdate', data, function (error, result) {
      if (error) {
        return throwError(error.reason);
      }
      if (result.signupNotOwned) {
        throwError('This slot has already been taken');
      }
    });
    //   }
    // }
	}
});

Template.slot.helpers({
  days: days,
  row: function () {
    var index = slots.indexOf(this.toString());
    return index;
  }
});

Template.day.helpers({
  row: function (parent) {
    var index = slots.indexOf(parent.toString());
    return index;
  },
  col: function () {
    var index = days.indexOf(this.toString());
    return index;
  },
  isTaken: function (parent) {
    var row = slots.indexOf(parent.toString());
    var col = days.indexOf(this.toString());
    var owner = Signups.findOne({slot: [col, row]});
    if (owner.userId) {
      if (owner.userId === Meteor.userId()) {
        return 'yours';
      } else {
        return 'taken';
      }
    };
    return undefined;
  }
});