import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

import { initialState } from '.';

const selectSlice = (state: RootState) => state.podcasts || initialState;

export const selectPodcasts = createSelector([selectSlice], state => state);
