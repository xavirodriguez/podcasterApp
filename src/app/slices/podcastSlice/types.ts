import { Podcast } from 'types/Podcast';

/* --- STATE --- */
export interface PodcastsState {
  items: Podcast[];
  loading: boolean;
}
