import * as api from './api';

import { ActionType, createAction, createActionTypes, createReducer } from '../redux.utils';
import { Dispatch, combineReducers } from 'redux';

import { AppState } from '../store';
import { Chore } from './models';

const types = createActionTypes('chores', {
  IS_LOADING_SET: 'IS_LOADING_SET',
  IS_UPDATING_SET: 'IS_UPDATING_SET',

  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
});

export const setIsLoadingChores = createAction(types.IS_LOADING_SET);
export const setIsUpdatingChores = createAction(types.IS_UPDATING_SET);

export const setChores = createAction(types.SET);
export const addChore = createAction(types.ADD);
export const deleteChores = createAction(types.DELETE);
export const updateChores = createAction(types.UPDATE);

const isLoading = createReducer(false, {
  [types.IS_LOADING_SET]: (state, action) => action.payload,
});

const isUpdating = createReducer(false, {
  [types.IS_UPDATING_SET]: (state, action) => action.payload,
});

const chores = createReducer<Chore[]>([], {
  [types.ADD]: (state: Chore[], action: ActionType<Chore>) => [...state, { ...action.payload }],
  [types.DELETE]: (state: Chore[], action: ActionType<Chore>) => state.filter((m) => action.payload.id !== m.id),
  [types.SET]: (state: Chore[], action: ActionType<Chore[]>) => [...action.payload],
  [types.UPDATE]: (state: Chore[], action: ActionType<Chore>) =>
    state.map((c) => {
      if (c.id === action.payload?.id) {
        return action.payload;
      }
      return c;
    }),
});

export function dispatchLoadChores() {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsLoadingChores(true));

    const accessToken = getState().user.currentUser?.accessToken;

    try {
      if (!accessToken) throw 'no token';

      const result = await api.getChores(accessToken);

      dispatch(setChores(result));
    } catch (e) {}

    dispatch(setIsLoadingChores(false));
  };
}

export function dispatchAddChore(chore: Chore) {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsUpdatingChores(true));

    const currentUser = getState().user.currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      if (!accessToken) throw 'no token';

      const result = await api.postChore(accessToken, chore);

      dispatch(addChore(result));
    } catch (e) {}

    dispatch(setIsUpdatingChores(false));
  };
}

export function dispatchUpdateChore(chore: Chore) {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsUpdatingChores(true));

    const currentUser = getState().user.currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      if (!accessToken) throw 'no token';

      const result = await api.putChore(accessToken, chore);

      dispatch(addChore(result));
    } catch (e) {}

    dispatch(setIsUpdatingChores(false));
  };
}

export function dispatchAddChores(chores: Chore[], success: () => void) {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsUpdatingChores(true));

    const currentUser = getState().user.currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      if (!accessToken) throw 'no token';

      for (let i = 0; i < chores.length; i++) {
        const result = await api.postChore(accessToken, chores[i]);
        dispatch(addChore(result));
      }

      success();
    } catch (e) {}

    dispatch(setIsUpdatingChores(false));
  };
}

export function dispatchDeleteChore(chore: Chore) {
  return async function (dispatch: Dispatch, getState: () => AppState) {
    dispatch(setIsUpdatingChores(true));

    const currentUser = getState().user.currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      if (!accessToken) throw 'no token';

      const resp = await api.deleteChore(accessToken, chore);

      dispatch(deleteChores(resp));
    } catch (e) {}

    dispatch(setIsUpdatingChores(false));
  };
}

export const choresReducers = combineReducers({
  chores,
  isLoading,
  isUpdating,
});
