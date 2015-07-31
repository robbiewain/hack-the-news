/* global getHostname, Story */

(function () {
  'use strict';

  describe('getHostname(url)', function () {
    it('returns the hostname', function () {
      var url = 'https://news.ycombinator.com/item?id=';
      expect(getHostname(url)).to.equal('news.ycombinator.com');
    });
  });

  describe('Story(item)', function () {
    var item;
    var story;

    before(function() {
      item = {
        'by' : 'craigkerstiens',
        'descendants' : 67,
        'id' : 9931121,
        'kids' : [ 9931258, 9931310, 9931291, 9931325, 9931170, 9931812, 9931453, 9931187, 9931780, 9931401, 9931937, 9931239, 9931797, 9931540, 9931173, 9931748, 9931144, 9931218, 9931270, 9931663, 9931162, 9931206 ],
        'score' : 213,
        'time' : Math.floor((Date.now() - 3600000) / 1000),
        'title' : 'Pro Rata',
        'type' : 'story',
        'url' : 'http://blog.ycombinator.com/pro-rata'
      };

      story = new Story(item);
    });

    it('should return a story object', function () {
      expect(story.url).to.equal(item.url);
      expect(story.title).to.equal(item.title);
      expect(story.site).to.equal('(blog.ycombinator.com)');
      expect(story.points).to.equal(item.score);
      expect(story.user.url).to.equal('https://news.ycombinator.com/user?id=' + item.by);
      expect(story.user.username).to.equal(item.by);
      expect(story.discussURL).to.equal('https://news.ycombinator.com/item?id=' + item.id);
      expect(story.timestamp).to.equal('an hour ago');
      expect(story.comments).to.equal(item.descendants);
    });

    describe('ASK HN story', function () {
      var hnStory;

      before(function () {
        delete item.url;
        item.text = 'hello world';
        item.title = 'Ask HN: Pro Rata';
        hnStory = new Story(item);
      });

      it('should return a story object', function () {
        expect(hnStory.url).to.equal('https://news.ycombinator.com/item?id=' + item.id);
        expect(hnStory.title).to.equal(item.title);
        expect(hnStory.site).to.equal('');
        expect(hnStory.points).to.equal(item.score);
        expect(hnStory.user.url).to.equal('https://news.ycombinator.com/user?id=' + item.by);
        expect(hnStory.user.username).to.equal(item.by);
        expect(hnStory.discussURL).to.equal('https://news.ycombinator.com/item?id=' + item.id);
        expect(hnStory.timestamp).to.equal('an hour ago');
        expect(hnStory.comments).to.equal(item.descendants);
      });
    });
  });
})();
