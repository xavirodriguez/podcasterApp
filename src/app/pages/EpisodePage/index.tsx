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
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { messages } from './messages';
import { useLoadingError } from 'app/hooks/useLoadingError';
import { usePodcastData } from 'app/hooks/usePodcastData';
import { EpisodeTags } from './EpisodeTags';

interface Props {}

export default function EpisodePage(props: Props) {
  const { t } = useTranslation();
  const podcasts = useSelector(selectPodcasts);
  const { actions } = usePodcastsSlice();
  const dispatch = useDispatch();
  const { id, trackId } = useParams();

  const {
    loading,
    setLoading,
    error,
    handleLoadedData,
    handleError,
    tryAgain,
  } = useLoadingError();

  const { podcast, episode } = usePodcastData(
    id,
    trackId,
    dispatch,
    actions,
    podcasts,
    setLoading,
  );

  useEffect(() => {
    dispatch(actions.fetchTracks(id));
  }, [actions, dispatch, id]);

  return (
    <FlexContainer>
      <EpisodeTags podcast={podcast} episode={episode} />
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
        {episode && (
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
        )}
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
