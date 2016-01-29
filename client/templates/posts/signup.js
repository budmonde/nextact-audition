Template.signup.helpers({
	slots: ['7:00PM - 7:15PM', '7:15PM - 7:30PM', '7:30PM - 7:45PM', '7:45PM - 8:00PM','8:00PM - 8:15PM', '8:15PM - 8:30PM', '8:30PM - 8:45PM', '8:45PM - 9:00PM','9:00PM - 9:15PM', '9:15PM - 9:30PM', '9:30PM - 9:45PM', '9:45PM - 10:00PM']
})

Template.signup.events({
	'click .slot': function(event) {
		event.preventDefault();
		var date = ['Mon', 'Tues', 'Wed'];
		var slots = ['7:00PM - 7:15PM', '7:15PM - 7:30PM', '7:30PM - 7:45PM', '7:45PM - 8:00PM','8:00PM - 8:15PM', '8:15PM - 8:30PM', '8:30PM - 8:45PM', '8:45PM - 9:00PM','9:00PM - 9:15PM', '9:15PM - 9:30PM', '9:30PM - 9:45PM', '9:45PM - 10:00PM'];
		var col = $(event.target).parent().children().index($(event.target)) - 1;
  		var row = $(event.target).parent().parent().children().index($(event.target).parent());

  		var signup = {
  			slot: (col, row)
  		}
  		signup._id = Signups.insert(signup);
  		Router.go('successPage', signup);
	}
})