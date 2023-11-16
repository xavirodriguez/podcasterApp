import { useEffect, useState } from 'react';
import { Podcast } from 'types/Podcast';
import { Track } from 'types/Track';

export const usePodcastData = (
  id,
  trackId,
  dispatch,
  actions,
  podcasts,
  setLoading,
) => {
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [episode, setEpisode] = useState<Track | null>(null);

  useEffect(() => {
    dispatch(actions.fetchTracks(id));
  }, [actions, dispatch, id]);

  useEffect(() => {
    setLoading(true);
    const podcast = podcasts.items.find(podcast => podcast.id === id);
    const trackIdNumber = parseInt(trackId ?? '0');
    if (
      podcast &&
      podcast.tracks?.length &&
      podcast.tracks.length >= trackIdNumber
    ) {
      const epi = podcast.tracks[trackIdNumber];
      setEpisode(epi);
      setPodcast(podcast);
    }
    setLoading(false);
  }, [id, podcasts, trackId, setLoading]);

  return { podcast, episode };
};
