'use strict';

var stories = {};
var topStoryIds = [];
var refs = {};
var NUM_STORIES = 5;
var ref = new Firebase('https://hacker-news.firebaseio.com/v0/');

function getHostname(url) {
	var a = document.createElement('a');
	a.href = url;
	return a.hostname;
}

function Story(item) {
	var hnURL = 'https://news.ycombinator.com/';
	var discussURL = hnURL + 'item?id=' + item.id;
	var url = item.url ? item.url : discussURL;

	return {
		id: item.id,
		url: url,
		title: item.title,
		site: item.url ? '(' + getHostname(item.url) + ')' : '',
		points: item.score,
		user: {
			url: hnURL + 'user?id=' + item.by,
			username: item.by
		},
		discussURL: discussURL,
		timestamp: moment(item.time*1000).fromNow(),
		comments: item.descendants
	};
}

function topStoriesChanged(snapshot) {
	var ids = snapshot.val();

	// Get each article's details and update in realtime
	ids.forEach(function(id) {
		refs[id] = ref.child('item').child(id).on('value', function(snapshot) {
			stories[id] = new Story(snapshot.val());
		});
	});

	// Show colored icon when top story changes
	if (topStoryIds[0] && topStoryIds[0] !== ids[0]) {
		chrome.browserAction.setIcon({ path: 'images/hacker-news-38.png' });
	}

	// Stop listening to old stories
	topStoryIds.filter(function(id) {
		return ids.indexOf(id) === -1;
	}).forEach(function(id) {
		ref.off('value', refs[id]);
		delete refs[id];
		delete stories[id];
	});

	// Store the IDs of the top articles
	topStoryIds = ids;
}

ref.child('topstories').limitToFirst(NUM_STORIES).on('value', topStoriesChanged);
