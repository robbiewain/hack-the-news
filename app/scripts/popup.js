'use strict';

function getHostnameFromURL(url) {
	var a = document.createElement('a');
	a.href = url;
	return a.hostname;
}

document.addEventListener('DOMContentLoaded', function() {
	var bg = chrome.extension.getBackgroundPage();

	var item = bg.item;

	if (item) {
		var discussURL = 'https://news.ycombinator.com/item?id=' + item.id;
		var url = item.url;
		if (!url) {
			url = discussURL;
		}
		$('#title').text(item.title).attr('href', url);
		$('#site').text(item.url ? '(' + getHostnameFromURL(url) + ')' : '');
		$('#points').text(item.score + ' points');
		$('#user').text(item.by).attr('href', 'https://news.ycombinator.com/user?id=' + item.by);
		$('#timestamp').text(moment(item.time*1000).fromNow()).attr('href', discussURL);
		$('#discuss').attr('href', discussURL);
		$('#comments').text(item.descendants + ' comments').attr('href', discussURL);

		chrome.browserAction.setIcon({ path: 'images/hacker-news-bw-38.png' });
	}
});
