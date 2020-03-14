import * as api from './api';

import { createAction, createActionTypes, createReducer } from '../redux.utils';

import { combineReducers } from 'redux';

const types = createActionTypes('users', {
  IS_LOADING_CURRENT_USER_SET: 'IS_LOADING_CURRENT_USER_SET',
  IS_UPDATING_CURRENT_USER_SET: 'IS_UPDATING_CURRENT_USER_SET',

  CURRENT_USER_SET: 'CURRENT_USER_SET'
});

export const setIsLoadingCurrentUser = createAction(
  types.IS_LOADING_CURRENT_USER_SET
);

export const setIsUpdatingCurrentUser = createAction(
  types.IS_UPDATING_CURRENT_USER_SET
);

export const setCurrentUser = createAction(types.CURRENT_USER_SET);

const isLoadingCurrentUser = createReducer(null, {
  [types.IS_LOADING_CURRENT_USER_SET]: (state, action) => action.payload
});

const isUpdatingCurrentUser = createReducer(null, {
  [types.IS_UPDATING_CURRENT_USER_SET]: (state, action) => action.payload
});

const currentUser = createReducer(null, {
  [types.CURRENT_USER_SET]: (state, action) => action.payload
});

export function dispatchLoadCurrentUser(idToken) {
  return async function(dispatch) {
    dispatch(setIsLoadingCurrentUser(true));
    try {
      const result = await api.getUser(idToken);
      const user = result.json();

      dispatch(setCurrentUser({ ...user, accessToken: idToken }));
    } catch (e) {}

    dispatch(setIsLoadingCurrentUser(false));
  };
}

export function dispatchUpdateCurrentUser(idToken) {
  return async function(dispatch) {
    dispatch(setIsUpdatingCurrentUser(true));
    try {
      const result = await api.updateUser(idToken);
      const user = result.json();

      dispatch(setCurrentUser({ ...user, accessToken: idToken }));
    } catch (e) {}

    dispatch(setIsUpdatingCurrentUser(false));
  };
}

export const userReducers = combineReducers({
  currentUser,
  isLoadingCurrentUser,
  isUpdatingCurrentUser
});
