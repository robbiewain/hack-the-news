'use strict';

var StoryList = React.createClass({
  getInitialState: function() {
    return { stories: [], expanded: false };
  },
  expand: function() {
    this.setState({ expanded: true });
  },
  render: function () {
    var stories = this.state.expanded ? this.state.stories : this.state.stories.slice(0, 1);
    var storyElements = stories.map(function (story) {
      return <StoryElement key={ story.id } story={ story } />;
    });
    return (
      <div>
        <ol>{ storyElements }</ol>
        { this.state.expanded ? null : <p className="more"><a href="#" onClick={ this.expand }>More</a></p> }
      </div>
    );
  }
});

var StoryElement = React.createClass({
  render: function () {
    return (
      <li className="story">
        <p>
          <a href={ this.props.story.url } target="_blank">{ this.props.story.title }</a>
          {' '}
          <span className="site">{ this.props.story.site }</span>
        </p>
        <small>
          <span>{ this.props.story.points } points</span> by <a href={ this.props.story.user.url } target="_blank">{ this.props.story.user.username }</a>
          {' | '}
          <a href={ this.props.story.discussURL } target="_blank">{ this.props.story.timestamp }</a>
          {' | '}
          <a href={ this.props.story.discussURL } target="_blank">Discuss</a>
          {' | '}
          <a href={ this.props.story.discussURL } target="_blank">{ this.props.story.comments } comments</a>
        </small>
      </li>
    );
  }
});
