import * as api from './api';

import { createAction, createActionTypes, createReducer } from '../redux.utils';

import { combineReducers } from 'redux';

const types = createActionTypes('chores', {
  IS_LOADING_SET: 'IS_LOADING_SET',
  IS_UPDATING_SET: 'IS_UPDATING_SET',

  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE'
});

export const setIsLoadingChores = createAction(types.IS_LOADING_SET);
export const setIsUpdatingChores = createAction(types.IS_UPDATING_SET);

export const setChores = createAction(types.SET);
export const addChores = createAction(types.ADD);
export const deleteChores = createAction(types.DELETE);
export const updateChores = createAction(types.UPDATE);

const isLoading = createReducer(false, {
  [types.IS_LOADING_SET]: (state, action) => action.payload
});

const isUpdating = createReducer(false, {
  [types.IS_UPDATING_SET]: (state, action) => action.payload
});

const chores = createReducer([], {
  [types.ADD]: (state, action) => [...state, { ...action.payload }],
  [types.DELETE]: (state, action) =>
    state.filter((m) => action.payload !== m.id),
  [types.SET]: (state, action) => [...action.payload],
  [types.UPDATE]: (state, action) =>
    state.map((m) => {
      if (m.id === action.payload?.id) {
        return action.payload;
      }
      return m;
    })
});

export function dispatchLoadChores() {
  return async function(dispatch, getState) {
    dispatch(setIsLoadingChores(true));

    const accessToken = getState().currentUser?.accessToken;

    try {
      const response = await api.getChores(accessToken);

      const result = await response.json();

      dispatch(setChores(result));
    } catch (e) {}

    dispatch(setIsLoadingChores(false));
  };
}

export function dispatchAddChore(chore) {
  return async function(dispatch, getState) {
    dispatch(setIsUpdatingChores(true));

    const currentUser = getState().currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      const response = await api.postChore(accessToken, chores);
      const result = await response.json();

      dispatch(addChores(result));
    } catch (e) {}

    dispatch(setIsUpdatingChores(false));
  };
}

export function dispatchAddChores(chores) {
  return async function(dispatch, getState) {
    dispatch(setIsUpdatingChores(true));

    const currentUser = getState().currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      const promises = chores.map((c) => api.postChore(accessToken, c));
      const responses = await Promise.all([...promises]);
      const results = await Promise.all(responses.map(async (r) => r.json()));
      results.forEach((r) => dispatch(addChores(r)));
    } catch (e) {}

    dispatch(setIsUpdatingChores(false));
  };
}

export function dispatchDeleteChore(choreId) {
  return async function(dispatch, getState) {
    dispatch(setIsUpdatingChores(true));

    const currentUser = getState().currentUser;

    const accessToken = currentUser?.accessToken;

    try {
      const choresResponse = await api.deleteChore(accessToken, choreId);
      const resp = await choresResponse.json();

      dispatch(deleteChores(resp));
    } catch (e) {}

    dispatch(setIsUpdatingChores(false));
  };
}

export const choresReducers = combineReducers({
  chores,
  isLoading,
  isUpdating
});
