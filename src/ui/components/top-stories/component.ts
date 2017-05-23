import Component, { tracked } from '@glimmer/component';

export default class TopStories extends Component {
  args: {
    stories: any[]
  }

  @tracked expanded: boolean = false;

  @tracked('args', 'expanded')
  get visibleStories() {
    return this.expanded ? this.args.stories : this.args.stories.slice(0, 1);
  }

  showMore() {
    this.expanded = true;
  }
}

