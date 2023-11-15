import { PayloadAction, Reducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import expireReducer from 'redux-persist-expire';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { watchFetchPodcasts } from './saga';
import { watchFetchTracks } from './saga';
import { PodcastsState } from './types';

export const initialState: PodcastsState = {
  items: [
    {
      id: '',
      title: '',
      author: '',
      small_image: '',
      url: '',
      description: '',
      tracks: [],
    },
  ],
  loading: true,
};

const slice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
    fetchPodcasts(state, action: PayloadAction<any>) {
      console.log('==> Fetch podcasts reducer');
    },
    fetchTracks(state, action: PayloadAction<any>) {
      console.log('==> FetchTracks reducer', action.payload);
    },
    setItems(state, action: PayloadAction<any>) {
      state.items = action.payload;
      state.loading = false;
    },
    setTracks(state, action) {
      const { id, tracks } = action.payload;

      state.items = state.items.map(item => {
        if (item.id === id) {
          return { ...item, tracks };
        }

        return item;
      });
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { fetchPodcasts, fetchTracks, setItems, setLoading } =
  slice.actions;

const expireConfig = {
  expireSeconds: 60 * 60 * 24, // 24 horas en segundos
};

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  transforms: [expireReducer('podcasts', expireConfig)],
};

const persistedSliceReducer: Reducer = persistReducer(
  persistConfig,
  slice.reducer,
);

export const usePodcastsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: persistedSliceReducer });
  useInjectSaga({ key: slice.name, saga: watchFetchPodcasts });
  useInjectSaga({ key: slice.name, saga: watchFetchTracks });

  return { actions: slice.actions };
};
