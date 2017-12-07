import Firebase from 'firebase';
import { switchIconOn } from './icon-switcher';
import Story from './story';
import StoryStore from './story-store';

const NUM_STORIES = 5;

export default class Background {
  private topStoryId: number;
  private topStoryIds: number[] = [];
  private stories: {};
  private store = new StoryStore();

  private firebase: Firebase =
    new Firebase('https://hacker-news.firebaseio.com/v0/');

  constructor() {
    this.firebase
      .child('topstories')
      .limitToFirst(NUM_STORIES)
      .on('value', this.topStoriesChanged, () => {}, this);
  }

  private topStoriesChanged(topStoriesRef) {
    this.stopStoryListeners();
    this.topStoryIds = topStoriesRef.val();
    this.changeTopStoryIcon(this.topStoryIds[0]);
    this.stories = {};
    this.startStoryListeners();
  }

  private stopStoryListeners() {
    this.topStoryIds.forEach((storyId) => {
      this.firebase.child(`item/${storyId}`).off();
    });
  }

  private startStoryListeners() {
    this.topStoryIds.forEach((storyId) => {
      this.firebase.child(`item/${storyId}`)
        .on('value', this.storyChanged, () => {}, this);
    });
  }

  private storyChanged(storyRef) {
    let story = new Story(storyRef.val());
    this.stories[story.id] = story;
    this.updateStore();
  }

  private changeTopStoryIcon(newTopStoryId: number) {
    if (this.topStoryId !== newTopStoryId) {
      this.topStoryId = newTopStoryId;
      switchIconOn();
    }
  }

  private updateStore() {
    this.store.storeStories(this.topStoryIds.map((topStoryId) => {
      return this.stories[topStoryId];
    }));
  }
}
