import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  fetchPodcasts,
  fetchTracksById,
} from '../../../services/podcastService';
import { setItems, setLoading } from './index';

function* handleFetchPodcasts() {
  try {
    yield put(setLoading(true));
    const items = yield select(state => state.podcasts.items);

    if (items.length === 1) {
      // items.length contains the default value. A request has never been made
      const items = yield call(fetchPodcasts);

      yield put(setItems(items));
    }
  } catch (error) {
    // TODO: Handle error
    console.log('ERROR');
  }
  yield put(setLoading(false));
}

export function* watchFetchPodcasts() {
  yield takeLatest('podcasts/fetchPodcasts', handleFetchPodcasts);
}

function* handleFetchTracks(action) {
  try {
    yield put(setLoading(true));
    const items = yield select(state => state.podcasts.items);
    const item = items.find(item => item.id === action.payload);

    if (item && !item.tracks) {
      const tracks = yield call(fetchTracksById, action.payload);

      yield put({
        type: 'podcasts/setTracks',
        payload: { id: action.payload, tracks },
      });
    }
  } catch (error) {
    console.error('Error al obtener los tracks', error);
  }
  yield put(setLoading(false));
}

export function* watchFetchTracks() {
  yield takeLatest('podcasts/fetchTracks', handleFetchTracks);
}
