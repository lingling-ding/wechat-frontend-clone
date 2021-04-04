import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  UserAuthenticatedAction,
  USER_AUTHENTICATED,
  FETCH_LOGGED_USER,
  SET_LOGGED_USER,
  LOGOUT,
} from '../actions/core.actions';
import { UserRepository } from '@app/shared/repositories/user.repository';

@Injectable()
export class CoreEffects {
  @Effect({ dispatch: true })
  userAuthenticated$: Observable<Action> = this.actions$.pipe(
    ofType(USER_AUTHENTICATED),
    tap(async (action: UserAuthenticatedAction) => {
      // TODO: Move this from token service here
      // await Storage.set({ key: STORAGE_KEYS.TOKEN, value: JSON.stringify(action.payload) });
    }),
    switchMap(() => of({ type: FETCH_LOGGED_USER }))
  );

  @Effect({ dispatch: true })
  fetchCurrentUser$: Observable<Action> = this.actions$.pipe(
    ofType(FETCH_LOGGED_USER),
    switchMap(() =>
      this.userRepository
        .getCurrentUser()
        .pipe(map(user => ({ type: SET_LOGGED_USER, payload: user })))
    )
  );

  @Effect({ dispatch: false })
  logout$: Observable<Action> = this.actions$.pipe(
    ofType(LOGOUT),
    tap(async () => {
      // TODO: Move this from token service here
      // await Storage.remove({ key: STORAGE_KEYS.TOKEN });
    })
  );

  constructor(private actions$: Actions, private userRepository: UserRepository) {}
}
