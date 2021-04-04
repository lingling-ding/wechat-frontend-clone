import {
  UserAuthenticatedAction,
  USER_AUTHENTICATED,
  FetchCurrentUser,
  FETCH_LOGGED_USER,
  SetAuthenticatedUserAction,
  SET_LOGGED_USER,
  LANGUAGE_CHANGED,
  LanguageChangedAction,
  LANGUAGE_INITIALIZED,
  LanguageInitializedAction,
  LOGOUT,
  LogoutAction,
} from '../actions/core.actions';
import { CoreState, initialState } from '@app/state/core';

export const coreReducers = (state: CoreState = initialState, action: Actions): CoreState => {
  let newState: CoreState;

  switch (action.type) {
    case USER_AUTHENTICATED:
      newState = {
        ...state,
        currentUser: {
          ...action.payload,
        },
      };
      break;
    case SET_LOGGED_USER:
      newState = {
        ...state,
        currentUser: {
          ...state.currentUser,
          user: action.payload,
        },
      };
      break;
    case LANGUAGE_CHANGED:
    case LANGUAGE_INITIALIZED:
      newState = {
        ...state,
        currentLanguage: action.payload.language,
      };
      break;
    case LOGOUT:
      newState = {
        ...state,
        currentUser: null,
      };
      break;
    case FETCH_LOGGED_USER:
    default:
      newState = state;
  }

  return newState;
};

export type Actions =
  | UserAuthenticatedAction
  | FetchCurrentUser
  | SetAuthenticatedUserAction
  | LogoutAction
  | LanguageChangedAction
  | LanguageInitializedAction;
