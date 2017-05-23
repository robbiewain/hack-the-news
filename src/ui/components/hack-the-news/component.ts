import Component, { tracked } from '@glimmer/component';
import { switchIconOff } from '../../../utils/icon-switcher';
import StoryStore from '../../../utils/story-store';

export default class TopStories extends Component {
  @tracked stories: any[] = [];

  constructor(options) {
    super(options);
    let store = new StoryStore();
    store.fetchStories().then((stories: any[]) => {
      this.stories = stories;
    });
  }

  didInsertElement() {
    switchIconOff();
  }
}
