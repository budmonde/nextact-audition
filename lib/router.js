Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() {
		return Meteor.subscribe('posts');
		return Meteor.subscribe('signups');
	}
});

Router.route('/',{name: 'postsList'});

Router.route('/success/:_id', {
	name: 'successPage',
	data: function () {
		var ans = Signups.findOne(this.params._id);
		console.log(ans);
		return ans;
	}
});

Router.route('/posts/:_id', {
	name: 'postPage',
	data: function () { return Posts.findOne(this.params._id); }
});

Router.route('/signup',{name: 'signup'});

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function () {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});