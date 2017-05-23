export default class StoryStore {
  fetchStories() {
    return new Promise((resolve) => {
      chrome.storage.local.get(({ stories }) => {
        resolve(stories);
      });
    });
  }

  storeStories(stories) {
    chrome.storage.local.set({ stories });
  }
}
