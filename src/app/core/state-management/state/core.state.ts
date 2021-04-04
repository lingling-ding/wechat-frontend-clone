import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrentUser } from '@app/interfaces/current-user';
import { Language } from '../../translation/languages.constants';

export interface CoreState {
  currentLanguage: Language;
  currentUser: CurrentUser;
}

export const initialState: CoreState = {
  currentLanguage: null,
  currentUser: {
    token: null,
    tokenExpiry: null,
    user: null,
  },
};

const getCoreState = createFeatureSelector<CoreState>('coreState');

export const getCurrentLanguage = createSelector(
  getCoreState,
  (state: CoreState) => state.currentLanguage
);
export const getCurrentUser = createSelector(getCoreState, (state: CoreState) => state.currentUser);

export const getToken = createSelector(getCoreState, (state: CoreState) => state.currentUser.token);

export const getLoggedUser = createSelector(
  getCoreState,
  (state: CoreState) => state?.currentUser?.user
);

export const notFetched = (u: any): boolean => u === undefined;
