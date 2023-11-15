import { StoreEnhancer } from '@reduxjs/toolkit';
import { watchFetchPodcasts } from 'app/slices/podcastSlice/saga';
import { watchFetchTracks } from 'app/slices/podcastSlice/saga';
import {
  createInjectorsEnhancer,
  injectReducer,
  injectSaga,
} from 'redux-injectors';
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { createReducer } from './reducers';
import * as initialState from './testData.json';
/*
// This file should pass the following test
it('should return a store with injected enhancers', () => {
  const store = createTestStore();
  expect(store).toEqual(
    expect.objectContaining({
      runSaga: expect.any(Function),
      injectedReducers: expect.any(Object),
      injectedSagas: expect.any(Object),
    }),
  );
  */
//Following the example of the test file, we can create a function that returns a store with injected enhancers.
//This function will be used in the test file to create a store with the same configuration as the production store.

export const createTestStore = () => {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const sagas = [watchFetchPodcasts, watchFetchTracks];
  const middlewares = [sagaMiddleware];
  const { run: runSaga } = sagaMiddleware;

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];

  const mockStore = configureMockStore({
    reducer: createReducer(),
    middleware: middlewares,
    enhancers,
  });

  try {
    const store = mockStore();

    //sagas.forEach(saga => sagaMiddleware.run(saga));
    console.log(store.getActions());
    console.log(store.getState());
    //sagas.forEach(saga => sagaMiddleware.run(saga));
    injectReducer({ key: 'podcasts', reducer: createReducer() });
    injectSaga({ key: 'podcasts', saga: watchFetchPodcasts });
    //injectSaga({ key: 'podcasts', saga: watchFetchTracks });
    // Here it is not working. Sagas are not injected and the store is not updated

    console.log(store);

    /* this prints the following:
      console.log
    {
      getState: [Function: getState],
      getActions: [Function: getActions],
      dispatch: [Function: dispatch],
      clearActions: [Function: clearActions],
      subscribe: [Function: subscribe],
      replaceReducer: [Function: replaceReducer]
    }

      at createTestStore (src/store/testStore.ts:62:13)

 FAIL  src/store/__tests__/testStore.test.ts
  configureStore
    ✕ should return a store with injected enhancers (54 ms)

  ● configureStore › should return a store with injected enhancers

    expect(received).toEqual(expected) // deep equality

    - Expected  - 4
    + Received  + 4

    - ObjectContaining {
    -   "injectedReducers": Any<Object>,
    -   "injectedSagas": Any<Object>,
    -   "runSaga": Any<Function>,
    + Object {
    +   "injectedReducers": undefined,
    +   "injectedSagas": undefined,
    +   "runSaga": undefined,
      }
      */
    return store;
  } catch (error) {
    console.error('------ALTERTA------');
    console.error(
      'Error al cargar el initialState desde el archivo JSON:',
      error,
    );

    return mockStore({});
  }
};
