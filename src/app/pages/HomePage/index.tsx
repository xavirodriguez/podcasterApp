import Loading from 'app/components/Loading/Loading';
import PodcastDescription from 'app/components/PodcastDescription/PodcastDescription';
import { usePodcastsSlice } from 'app/slices/podcastSlice';
import { selectPodcasts } from 'app/slices/podcastSlice/selectors';
import { t } from 'i18next';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { messages } from './messages';
import { useFilterPodcasts } from 'app/hooks/useFilterPodcasts';

export function HomePage() {
  const [searchText, setSearchText] = useState('');
  const { actions } = usePodcastsSlice();
  const dispatch = useDispatch();
  const podcasts = useSelector(selectPodcasts);

  useEffect(() => {
    dispatch(actions.fetchPodcasts(''));
  }, [dispatch, actions]);

  const filteredPodcasts = useFilterPodcasts(podcasts, searchText);

  const handleSearch = event => {
    const searchText = event.target.value;
    setSearchText(searchText);
  };

  const renderPodcasts = () => {
    const podcastsToDisplay = searchText ? filteredPodcasts : podcasts.items;

    return podcastsToDisplay.map(podcast => (
      <PodcastDescription
        key={podcast.id}
        title={podcast.title}
        author={podcast.author}
        imageUrl={podcast.small_image}
        id={podcast.id}
      ></PodcastDescription>
    ));
  };

  return (
    <>
      <Helmet>
        <title>Podcaster</title>
        <meta name="description" content={t(messages.description())} />
      </Helmet>
      <SubHeader>
        <PodcastCount>
          {searchText ? filteredPodcasts.length : podcasts.items.length}
        </PodcastCount>
        <SearchInput
          type="text"
          placeholder={t(messages.filter())}
          value={searchText}
          onChange={handleSearch}
        />
      </SubHeader>
      {podcasts.loading && <Loading />}
      {!podcasts.loading && (
        <PodcastContainer>{renderPodcasts()}</PodcastContainer>
      )}
    </>
  );
}

const PodcastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SubHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 45px;
  margin: 20px 0px;
`;

const PodcastCount = styled.div`
  margin-right: 10px;
  width: 35px;
  height: 35px;
  background-color: #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: white;
`;

const SearchInput = styled.input`
  margin: 10px;
`;
