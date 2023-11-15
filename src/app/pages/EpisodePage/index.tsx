/**
 *
 * EpisodePage
 *
 */
import Box from 'app/components/Layout/Box';
import FlexContainer from 'app/components/Layout/FlexContainer';
import MainSection from 'app/components/Layout/MainSection';
import Sidebar from 'app/components/Layout/Sidebar';
import Loading from 'app/components/Loading/Loading';
import { PodcastInfo } from 'app/components/PodcastInfo';
import { usePodcastsSlice } from 'app/slices/podcastSlice';
import { selectPodcasts } from 'app/slices/podcastSlice/selectors';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Podcast } from 'types/Podcast';
import { Track } from 'types/Track';

import { messages } from './messages';

interface Props {}

export default function EpisodePage(props: Props) {
  const { t } = useTranslation();
  const podcasts = useSelector(selectPodcasts);
  const { actions } = usePodcastsSlice();
  const dispatch = useDispatch();
  const [podcast, setPodcast] = useState<Podcast>();
  const [episode, setEpisode] = useState<Track>({
    trackName: 'default',
    releaseDate: '',
    episodeUrl: '',
    description: '',
    trackTimeMillis: '',
  });
  const { id, trackId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    } else {
      console.log(t(messages.trackNotFound()));
    }
    setLoading(false);
  }, [id, podcasts, t, trackId]);

  const handleLoadedData = () => {
    setLoading(false);
  };

  const handleError = e => {
    setLoading(false);
    setError(true);
  };

  const tryAgain = () => {
    setLoading(true);
    setError(false);
  };

  return (
    <FlexContainer>
      <Sidebar>
        {podcast && (
          <PodcastInfo
            image={podcast.small_image}
            title={podcast.title}
            author={podcast.author}
            description={podcast.description}
          />
        )}
      </Sidebar>
      <MainSection>
        <Box>
          <h2>{episode.trackName}</h2>
          {episode.description}
          <hr />
          {loading && <Loading />}
          {!error && episode.episodeUrl && (
            <Player
              controls
              preload="auto"
              onLoadedData={handleLoadedData}
              onError={handleError}
            >
              <source src={episode.episodeUrl} />
            </Player>
          )}
          {error && (
            <>
              <p>{t(messages.errorButDownload())}.</p>
              <a href={episode.episodeUrl}>{t(messages.download())}</a>
              <StyledLink onClick={tryAgain}>
                {t(messages.tryAgain())}
              </StyledLink>
            </>
          )}
        </Box>
      </MainSection>
    </FlexContainer>
  );
}
const Player = styled.audio`
  width: 100%;
  height: 50px;
`;
const StyledLink = styled.span`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 10px;
`;
