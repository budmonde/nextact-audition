Template.postEdit.events({
	'submit form': function (event) {
		event.preventDefault();

		var currentPostId = this._id;

		var edit = {
			url: $(event.target).find('[name=url]').val(),
			title: $(event.target).find('[name=title]').val()
		}

		Meteor.call('postEdit', edit, function(error, result) {
			if (error) {
				return throwError(error.reason);
			}
			if (result.postExists) {
				throwError('This link has already been posted');
			}
			Router.go('postList', {id: result._id});
		});
	},
	'click .delete': function (event) {
		event.preventDefault();

		if (confirm("Delete this post?")) {
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
})