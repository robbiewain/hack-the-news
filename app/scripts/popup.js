'use strict';

var storyList = React.render(React.createElement(StoryList), document.getElementById('stories'));
var bg = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function() {
	var stories = bg.topStoryIds.map(function(id) { return bg.stories[id]; });
	storyList.setState({ stories: stories, expanded: false });
	chrome.browserAction.setIcon({ path: 'images/hacker-news-bw-38.png' });
});
