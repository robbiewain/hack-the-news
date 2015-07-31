'use strict';

var StoryList = React.createClass({displayName: "StoryList",
  getInitialState: function() {
    return { stories: [], expanded: false };
  },
  expand: function() {
    this.setState({ expanded: true });
  },
  render: function () {
    var stories = this.state.expanded ? this.state.stories : this.state.stories.slice(0, 1);
    var storyElements = stories.map(function (story) {
      return React.createElement(StoryElement, {key:  story.id, story:  story });
    });
    return (
      React.createElement("div", null, 
        React.createElement("ol", null,  storyElements ), 
         this.state.expanded ? null : React.createElement("p", {className: "more"}, React.createElement("a", {href: "#", onClick:  this.expand}, "More"))
      )
    );
  }
});

var StoryElement = React.createClass({displayName: "StoryElement",
  render: function () {
    return (
      React.createElement("li", {className: "story"}, 
        React.createElement("p", null, 
          React.createElement("a", {href:  this.props.story.url, target: "_blank"},  this.props.story.title), 
          ' ', 
          React.createElement("span", {className: "site"},  this.props.story.site)
        ), 
        React.createElement("small", null, 
          React.createElement("span", null,  this.props.story.points, " points"), " by ", React.createElement("a", {href:  this.props.story.user.url, target: "_blank"},  this.props.story.user.username), 
          ' | ', 
          React.createElement("a", {href:  this.props.story.discussURL, target: "_blank"},  this.props.story.timestamp), 
          ' | ', 
          React.createElement("a", {href:  this.props.story.discussURL, target: "_blank"}, "Discuss"), 
          ' | ', 
          React.createElement("a", {href:  this.props.story.discussURL, target: "_blank"},  this.props.story.comments, " comments")
        )
      )
    );
  }
});
