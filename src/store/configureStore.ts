import { configureStore, StoreEnhancer } from '@reduxjs/toolkit';
import { watchFetchPodcasts } from 'app/slices/podcastSlice/saga';
import { watchFetchTracks } from 'app/slices/podcastSlice/saga';
import { createInjectorsEnhancer } from 'redux-injectors';
import { persistReducer } from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/lib/constants';
import storage from 'redux-persist/lib/storage';
import expireReducer from 'redux-persist-expire';
import createSagaMiddleware from 'redux-saga';

import { createReducer } from './reducers';

const expireConfig = {
  expireSeconds: 60 * 60 * 24, // 24 horas en segundos
};

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  transforms: [expireReducer('podcasts', expireConfig)],
};

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;
  const sagas = [watchFetchPodcasts, watchFetchTracks];
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];

  const store = configureStore({
    reducer: persistReducer(persistConfig, createReducer()),
    middleware: defaultMiddleware => [
      ...defaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      ...middlewares,
    ],
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production' ||
      process.env.PUBLIC_URL.length > 0,
    enhancers,
  });

  sagas.forEach(saga => sagaMiddleware.run(saga));

  return store;
}
