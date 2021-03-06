import { tracked } from '@glimmer/component';
import { formatDistanceStrict } from 'date-fns';
import { IHackerNewsItem } from './hacker-news-item';

export default class Story {
  id: number;
  url: string;
  title: string;
  site: string;
  points: number;
  userUrl: string;
  userName: string;
  discussUrl: string;
  timestamp: string;
  comments: number;

  constructor(item: IHackerNewsItem) {
    let hnURL = 'https://news.ycombinator.com/';
    let discussUrl = hnURL + 'item?id=' + item.id;
    let url = item.url ? item.url : discussUrl;

    this.id = item.id;
    this.url = url;
    this.title = item.title;
    this.site = item.url ? `(${this._getHostname(item.url)})` : '';
    this.points = item.score;
    this.userUrl = hnURL + 'user?id=' + item.by;
    this.userName = item.by;
    this.discussUrl = discussUrl;
    this.timestamp = formatDistanceStrict(item.time * 1000, new Date(), { addSuffix: true });
    this.comments = item.descendants;
  }

  private _getHostname(url) {
    let a = document.createElement('a');
    a.href = url;
    return a.hostname;
  }
}
