import { useMemo } from 'react';

export const useFilterPodcasts = (podcasts, searchText) => {
  return useMemo(() => {
    return podcasts.items.filter(podcast => {
      const titleMatch = podcast.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const authorMatch = podcast.author
        .toLowerCase()
        .includes(searchText.toLowerCase());

      return titleMatch || authorMatch;
    });
  }, [searchText, podcasts.items]);
};
