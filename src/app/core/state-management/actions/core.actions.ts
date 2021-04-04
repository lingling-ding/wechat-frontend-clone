import { Action } from '@ngrx/store';
import { Language } from '../../translation/languages.constants';
import { User } from '@app/interfaces/user';

export const USER_AUTHENTICATED = 'CORE:USER_AUTHENTICATED';
export const FETCH_LOGGED_USER = 'CORE:FETCH_LOGGED_USER';
export const SET_LOGGED_USER = 'CORE:SET_LOGGED_USER';
export const LOGOUT = 'CORE:LOGOUT';
export const LANGUAGE_CHANGED = 'CORE:LANGUAGE_CHANGED';
export const LANGUAGE_INITIALIZED = 'CORE:LANGUAGE_INITIALIZED';
export const EFFECT_ERROR_OCCURRED = 'CORE:EFFECT_ERROR_OCCURRED';
export const SESSION_EXPIRED = 'CORE:SESSION_EXPIRED';

export class UserAuthenticatedAction implements Action {
  readonly type = USER_AUTHENTICATED;

  constructor(public payload) {}
}
export class FetchCurrentUser implements Action {
  readonly type = FETCH_LOGGED_USER;

  constructor() {}
}

export class SetAuthenticatedUserAction implements Action {
  readonly type = SET_LOGGED_USER;

  constructor(public payload: User) {}
}

export class LanguageInitializedAction implements Action {
  readonly type = LANGUAGE_INITIALIZED;

  constructor(public payload: { language: Language }) {}
}

export class LanguageChangedAction implements Action {
  readonly type = LANGUAGE_CHANGED;

  constructor(public payload: { language: Language }) {}
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;

  constructor() {}
}
