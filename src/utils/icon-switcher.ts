function setChromeIcon(path: string) {
  chrome.browserAction.setIcon({ path });
}

export function switchIconOn() {
  setChromeIcon('images/hacker-news-38.png');
}

export function switchIconOff() {
  setChromeIcon('images/hacker-news-bw-38.png');
}
