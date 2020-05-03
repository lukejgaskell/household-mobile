import * as api from './api';

import { ActionType, createAction, createActionTypes, createReducer } from '../redux.utils';
import { Dispatch, combineReducers } from 'redux';

import { AppState } from '../store';
import { AsyncStorage } from 'react-native';
import { User } from './models';

const types = createActionTypes('users', {
  IS_LOADING_CURRENT_USER_SET: 'IS_LOADING_CURRENT_USER_SET',
  IS_UPDATING_CURRENT_USER_SET: 'IS_UPDATING_CURRENT_USER_SET',

  CURRENT_USER_SET: 'CURRENT_USER_SET',
});

export const setIsLoadingCurrentUser = createAction(types.IS_LOADING_CURRENT_USER_SET);

export const setIsUpdatingCurrentUser = createAction(types.IS_UPDATING_CURRENT_USER_SET);

export const setCurrentUser = createAction(types.CURRENT_USER_SET);

const isLoadingCurrentUser = createReducer(false, {
  [types.IS_LOADING_CURRENT_USER_SET]: (state, action) => action.payload,
});

const isUpdatingCurrentUser = createReducer(false, {
  [types.IS_UPDATING_CURRENT_USER_SET]: (state, action) => action.payload,
});

const currentUser = createReducer<User | null>(null, {
  [types.CURRENT_USER_SET]: (state: User | null, action: ActionType<User | null>) => action.payload,
});

export function dispatchLoadCurrentUser() {
  return async function (dispatch: Dispatch) {
    dispatch(setIsLoadingCurrentUser(true));
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const user = await api.getUser(token);

        dispatch(setCurrentUser({ ...user, accessToken: token }));
      }
    } catch (e) {}

    dispatch(setIsLoadingCurrentUser(false));
  };
}

export function dispatchUpdateCurrentUser(idToken: string) {
  return async function (dispatch: Dispatch) {
    dispatch(setIsUpdatingCurrentUser(true));
    try {
      await AsyncStorage.setItem('userToken', idToken);
      const user = await api.updateUser(idToken);

      dispatch(setCurrentUser({ ...user, accessToken: idToken }));
    } catch (e) {}

    dispatch(setIsUpdatingCurrentUser(false));
  };
}

export function dispatchUpdateUserToken(idToken: string) {
  return async function (dispatch: Dispatch) {
    dispatch(setIsUpdatingCurrentUser(true));
    try {
      await AsyncStorage.setItem('userToken', idToken);
      const user = await api.updateUser(idToken);

      dispatch(setCurrentUser({ ...user, accessToken: idToken }));
    } catch (e) {}

    dispatch(setIsUpdatingCurrentUser(false));
  };
}

export function dispatchUpdateUserStatus(showWelcome: boolean) {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsUpdatingCurrentUser(true));

    const currentUser = getState().user.currentUser;

    const accessToken = currentUser?.accessToken;
    try {
      if (!accessToken) throw 'no token';

      const user = await api.updateUser(accessToken, showWelcome);

      dispatch(setCurrentUser({ ...user, accessToken }));
    } catch (e) {}

    dispatch(setIsUpdatingCurrentUser(false));
  };
}

export const userReducers = combineReducers({
  currentUser,
  isLoadingCurrentUser,
  isUpdatingCurrentUser,
});
