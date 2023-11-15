import { Track } from './Track';

export interface Podcast {
  id: string;
  title: string;
  author: string;
  url: string;
  small_image: string;
  large_image?: string;
  description?: string;
  tracks?: Track[];
}
