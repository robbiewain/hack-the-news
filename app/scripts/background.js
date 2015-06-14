'use strict';

var ref = new Firebase('https://hacker-news.firebaseio.com/v0/');
var itemRef;
var item;

ref.child('topstories').child(0).on('value', function(snapshot) {
	if (itemRef) {
		itemRef.off();
	}

	//Get the ID of the top article
	var id = snapshot.val();

	//Get the article details and update in realtime
	itemRef = ref.child('item').child(id);
	itemRef.on('value', function(snapshot) {
		var newItem = snapshot.val();
		if (item && newItem.id !== item.id) {
			chrome.browserAction.setIcon({ path: 'images/hacker-news-38.png' });
		}
		item = newItem;
	});
});
