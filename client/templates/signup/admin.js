var days = ['Sunday', 'Monday', 'Tuesday'];
var slots = ['7:00PM - 7:15PM', '7:15PM - 7:30PM', '7:30PM - 7:45PM', '7:45PM - 8:00PM','8:00PM - 8:15PM', '8:15PM - 8:30PM', '8:30PM - 8:45PM', '8:45PM - 9:00PM'];

Template.admin.helpers({
	slots: slots
});

Template.adminslot.helpers({
  days: days,
  row: function () {
    var index = slots.indexOf(this.toString());
    return index;
  }
});

Template.adminday.helpers({
  row: function (parent) {
    var index = slots.indexOf(parent.toString());
    return index;
  },
  col: function () {
    var index = days.indexOf(this.toString());
    return index;
  },
  email: function (parent) {
    var row = slots.indexOf(parent.toString());
    var col = days.indexOf(this.toString());
    var owner = Signups.findOne({slot: [col, row]});
    if (owner.userId) {
      return Meteor.users.findOne({_id: owner.userId}).emails[0].address;
    };
    return undefined;
  },
});