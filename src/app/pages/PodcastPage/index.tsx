/**
 *
 * PodcastPage
 *
 */

import { DataTable } from 'app/components/DataTable';
import Box from 'app/components/Layout/Box';
import FlexContainer from 'app/components/Layout/FlexContainer';
import MainSection from 'app/components/Layout/MainSection';
import Sidebar from 'app/components/Layout/Sidebar';
import Loading from 'app/components/Loading/Loading';
import { PodcastInfo } from 'app/components/PodcastInfo';
import { usePodcastsSlice } from 'app/slices/podcastSlice';
import { selectPodcasts } from 'app/slices/podcastSlice/selectors';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Podcast } from 'types/Podcast';

import { messages } from './messages';

export const PodcastPage = () => {
  const { t } = useTranslation();
  const { actions } = usePodcastsSlice();
  const podcasts = useSelector(selectPodcasts);
  const dispatch = useDispatch();
  const [podcastData, setPodcastData] = useState<Podcast>();
  const { id } = useParams();

  useEffect(() => {
    dispatch(actions.fetchTracks(id));
  }, [dispatch, actions, id]);

  useEffect(() => {
    const podcast = podcasts.items.find(podcast => podcast.id === id);

    if (podcast) {
      setPodcastData(podcast);
    } else {
      console.log('No se ha encontrado el podcast');
    }
  }, [podcasts, id]);

  return (
    <FlexContainer>
      {podcastData && (
        <>
          <Sidebar>
            <PodcastInfo
              image={podcastData.small_image}
              title={podcastData.title}
              author={podcastData.author}
              description={podcastData.description}
            />
          </Sidebar>
          <MainSection>
            <Box>
              {t(
                ...messages.episodes(
                  podcastData.tracks?.length.toString() ?? '0',
                ),
              )}
            </Box>
            <Box>
              {podcasts.loading && <Loading />}
              {!podcasts.loading &&
                podcastData.tracks &&
                podcastData.tracks?.length > 0 &&
                id && (
                  <DataTable
                    collectionId={id}
                    tracks={podcastData.tracks ?? []}
                  />
                )}
            </Box>
          </MainSection>
        </>
      )}
    </FlexContainer>
  );
};
